import { useReducer } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { FiFolder } from "react-icons/fi";
import items from './items'

export default function Filesystem() {
    const [selectedOptions, dispatch] = useReducer((state, action) => {
        const { name, payload, type } = action
        switch (type) {
            case "add":
                return state = [...state, payload]

            case "remove":
                const obj = state.filter(item => item.name !== name)
                return state = obj

            default:
                return state
        }
    }, [{ name: "Music" }])

    return (
        <div className="filesystem-wrapper bg-gray-800 border border-gray-700 overflow-hidden rounded-lg divide-y divide-gray-700">
            {
                <OptionsList
                    options={items}
                    selectedOptions={selectedOptions}
                    dispatch={dispatch}
                    level={1}
                />
            }
        </div>
    );
}

const OptionsList = ({ options, selectedOptions, dispatch, level }) => {
    //recursive function's conditional termination
    return options ? options.map((option, index) => {
        const { name, children } = option
        const isSelected = selectedOptions.some(obj => obj.name === name) //uid is best

        return <section
            key={name + index}
            data-level={level}
            onClick={(e) => {
                e.stopPropagation()
                if (children) {
                    if (isSelected) dispatch({ type: 'remove', name })
                    else dispatch({ type: 'add', payload: { name, children } })
                }
            }}
            className={`
                ${isSelected && 'bg-gray-700 bg-opacity-50'}
            `}
        >
            <div
                className={`flex items-center h-14 space-x-2 text-gray-100 cursor-pointer`}
                style={{ paddingLeft: level * 20 }}
            >
                {
                    children && children.length ?
                        <FiFolder className={isSelected ? "text-blue-400" : "text-gray-400"} /> :
                        <span className={`h-2 w-2 bg-gray-500 mr-2 rounded-full`}></span>
                }
                <span className={`flex-1 truncate ${isSelected && "text-blue-400"}`}>
                    {name}
                </span>
                <span className="text-gray-400 text-sm pr-5">{children ? children.length + " items" : ""}</span>
            </div>
            {
                //recursive call to render children
                children && isSelected ?
                    <AnimatePresence>
                        <motion.div
                            className="motion-div"
                            initial={{ y: -10, opacity: 0, }}
                            animate={{ y: 0, opacity: 1, }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ type: "tween" }}
                        >
                            <OptionsList
                                options={children}
                                selectedOptions={selectedOptions}
                                dispatch={dispatch}
                                level={level + 1}
                            />
                        </motion.div>
                    </AnimatePresence>
                    : null
            }
        </section>
    }) : null
}