import React, { useReducer } from 'react';
import items from './items'
import './Sidebar.css'

const Sidebar = () => {
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
    }, [])

    return (
        <div className="sidebar-parent">
            {
                <OptionsList
                    options={items}
                    selectedOptions={selectedOptions}
                    dispatch={dispatch}
                    level={10}
                />
            }
        </div>
    );
}

const OptionsList = ({ options, selectedOptions, dispatch, level }) => {

    if (options) return (
        options.map((option, index) => {
            const { name, children } = option
            const result = () => selectedOptions.some(obj => obj.name === name)
            const arrow = children ? "arrow" : ""

            return (
                <ul key={name + index}>
                    <li
                        className={`child ${name} ${arrow} ${result() ? 'expanded' : ''}`}
                        data-level={level}
                        style={{ paddingLeft: (level + 15) + 'px' }}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (children) {
                                if (result()) {
                                    dispatch({
                                        type: 'remove', name
                                    })
                                } else {
                                    dispatch({
                                        type: 'add',
                                        payload: { name, children }
                                    })
                                }
                            }
                        }}
                    ><span>{name}</span> <span className="count">{children && children.length + " items"}</span></li>
                    {
                        children && result() ?
                            <OptionsList
                                options={children}
                                selectedOptions={selectedOptions}
                                dispatch={dispatch}
                                level={level + 10}
                                arrow={arrow}
                            />
                            : null
                    }
                </ul>
            )
        })
    )
}

export default Sidebar;
