import React, { useState } from 'react'
import { FiChevronDown } from "react-icons/fi"
import "./dropdown.css"

const data = ['Item 1', 'Item 2', 'Item 3',]

const Dropdown = () => {
    const [val, setVal] = useState('')

    return (
        <div style={{ color: 'white' }} className={'_dropdown'}>
            <div className="input-wrapper flex">
                <input type="text" value={val} onChange={e => setVal(e.target.value)} placeholder="click me" />
                <div className="dropdown-icon">
                    <FiChevronDown />
                </div>
            </div>
            <div className="data">
                {
                    data.map(item => <div onClick={() => setVal(item)}>{item}</div>)
                }
            </div>
        </div>
    )
}

export default Dropdown;
