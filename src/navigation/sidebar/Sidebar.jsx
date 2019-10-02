import React, { useReducer, useEffect } from 'react';
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
                />
            }
        </div>
    );
}

const OptionsList = ({ options, selectedOptions, dispatch }) => {

    if (options) return (
        options.map((option, index) => {
            const { name, children } = option
            return (
                <ul key={name + index} className={`parent ${name}`}>
                    <li
                        className={`child ${name}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (children) {
                                const result = selectedOptions.some(obj => obj.name === name)
                                if (result) {
                                    //REMOVE ITEM
                                    console.log("Removing", name, "...");
                                    dispatch({
                                        type: 'remove', name
                                    })
                                } else {
                                    //ADD ITEM
                                    console.log("Adding", name, "...");
                                    dispatch({
                                        type: 'add',
                                        payload: { name, children }
                                    })
                                }
                            }
                        }}
                    >{name}</li>
                    {
                        children && selectedOptions.some(obj => obj.name === name) ?
                            <OptionsList
                                options={children}
                                selectedOptions={selectedOptions}
                                dispatch={dispatch}
                            />
                            : null
                    }
                </ul>
            )
        })
    )
}

export default Sidebar;
