import React, { useState, useRef } from 'react';
import items from "./names.js"
import "./select.css"

const Select = () => {
    const [users, setUsers] = useState(items)
    const [inputValue, setInputValue] = useState("")
    const [optionsData, setOptionsData] = useState([])
    const [selected, setSelected] = useState([])

    const inputRef = useRef()

    const search = event => {
        const val = event.target.value
        setInputValue(val)

        const regex = new RegExp(val, 'gi')
        const data = users.filter(user => user.firstName.match(regex) || user.lastName.match(regex))
        if(val.length) setOptionsData(data)
        else setOptionsData([])
    }
    
    return (
        <div className="select-parent">
            <section className="input-wrapper flex box-shadow">
                {
                    selected.length ? 
                        <div className="selected-parent">
                            {
                                selected.map(sel => 
                                    <div className="selected" key={sel.id}>{`${sel.firstName}`}</div>
                                )
                            }
                        </div>
                    : null
                }
                {
                    selected.length < 4 ?
                        <input
                            type="text"
                            className="select-input"
                            onChange={search}
                            placeholder={`Select ${4 - selected.length} ${selected.length === 3 ? "more" : "names"}`}
                            value={inputValue}
                            ref={inputRef}
                        />
                    : 
                        <div 
                            className="clear" 
                            onClick={() => {
                                setSelected([])
                                setUsers(items)
                            }}
                        >X</div>
                }
            </section>

            {
                optionsData.length ?
                    <div className="options-parent">
                        {
                            optionsData.map(user => {
                                return (
                                    <div 
                                        key={user.id}
                                        className="option"
                                        onClick={() => {
                                            setSelected([...selected, user])
                                            const x = users.filter(elem => user.id !== elem.id)
                                            setUsers(x)
                                            setOptionsData([])
                                            setInputValue([])
                                            inputRef.current.focus()
                                        }}
                                    >
                                        {`${user.firstName} ${user.lastName}`}
                                    </div>
                                )
                            })
                        }
                    </div>
                : null

            }
            

        </div>
    );
}

export default Select;
