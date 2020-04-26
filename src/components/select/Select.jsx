import React, { useState, useRef } from 'react';
import { FiXCircle } from "react-icons/fi"
import names from "./names.js"
import "./select.scss"

const Select = () => {
    const [users, setUsers] = useState(names)
    const [inputValue, setInputValue] = useState("")
    const [optionsData, setOptionsData] = useState([])
    const [selected, setSelected] = useState([])
    const maxItems = 3

    const inputRef = useRef()

    const search = event => {
        const val = event.target.value
        setInputValue(val)

        const regex = new RegExp(val, 'gi')
        const data = users.filter(user => user.firstName.match(regex) || user.lastName.match(regex))
        if (val.length) setOptionsData(data)
        else setOptionsData([])
    }

    return (
        <div className="select-parent">
            <div className="input-wrapper flex box-shadow">
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
                    // MaxLength of items selectable 
                    selected.length < maxItems ?
                        <input
                            type="text"
                            className="select-input"
                            onChange={search}
                            // placeholder={`Type to select ${4 - selected.length} ${selected.length === 3 ? "more" : "names"}`}
                            placeholder="Type to select"
                            value={inputValue}
                            ref={inputRef}
                        />
                        :
                        <div
                            className="clear"
                            onClick={() => {
                                setSelected([])
                                setUsers(names)
                            }}
                        ><FiXCircle /></div>
                }
            </div>

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
