import React, { useState } from 'react'
import { motion } from "framer-motion"
import { FiChevronDown } from "react-icons/fi"
import "./carousel.css"


const Dropdown = () => {
    const [id, setID] = useState(null)
    const elements = []
    const boxes = []

    for (let i = 0; i < 5; i++) {
        boxes.push(
            <div className="box" key={i}>
                <span>{`item ${i + 1}`}</span>
            </div>
        )
        elements.push(
            <div
                key={i}
                className={`step ${id === i ? 'selected' : ''}`}
                onClick={() => setID(i)}
            >
            </div>
        )
    }

    return (
        <div style={{ color: 'white' }} className={'_carousel rounded'}>
            <div className="boxes-wrapper">
                {boxes}
            </div>
            <div className="steps-wrapper">{elements}</div>
        </div>
    )
}

export default Dropdown;
