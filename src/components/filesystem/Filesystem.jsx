import React, { useReducer } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { FiFolder } from "react-icons/fi";
import items from './items'
import './filesystem.scss'

const Filesystem = () => {
    const [selectedOptions, dispatch] = useReducer((state, action) => {
        const { name, payload, type } = action
        switch (type) {
            case "add":
                const newArr = [...state, payload]
                return state = newArr

            case "remove":
                const obj = state.filter(item => item.name !== name)
                return state = obj

            default:
                return state
        }
    }, [{ name: "Music" }])

    return (
        <div className="filesystem-wrapper box-shadow">
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
    return options ? options.map((option, index) => {
        const { name, children } = option
        const isSelected = selectedOptions.some(obj => obj.name === name)

        return <section
            key={name + index}
            data-level={level}
            className={`${children ? "parent" : "single"} ${isSelected ? 'expanded' : ''}`}
            onClick={(e) => {
                e.stopPropagation()
                if (children) {
                    if (isSelected) dispatch({ type: 'remove', name })
                    else dispatch({ type: 'add', payload: { name, children } })
                }
            }}
        >
            <div className="info" style={{ paddingLeft: level * 20 }}>
                {
                    children && children.length ?
                        <FiFolder className="icon" /> :
                        <div className="circle"></div>
                }
                <span>{name}</span> <span className="count">{children ? children.length + " items" : ""}</span>
            </div>
            {
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

export default Filesystem;
