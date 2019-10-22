import React, { useState } from 'react'
import { motion } from "framer-motion"
import "./carousel.css"
// import { FiChevronDown } from "react-icons/fi"

const Carousel = ({ count }) => {
    let num = count || 5
    const [id, setID] = useState(0)
    const indicators = []
    const boxes = []
    const colors = ["#08d9d6", '#59a985', '#6a5acd', '#e6d3a7', '#2e79ba']

    for (let i = 0; i < num; i++) {
        boxes.push(
            <div
                className="box"
                key={i}
                style={{
                    backgroundColor: colors[i],
                    color: colors[i + 1] || colors[i - 3]
                }}
            >
                <span>{`item ${i + 1}`}</span>
            </div>
        )
        indicators.push(
            <div
                key={i}
                className={`indicator ${id === i ? 'selected' : ''}`}
                onClick={() => setID(i)}
            >
                <div style={{ background: id === i && colors[i] }}></div>
            </div>
        )
    }

    return (
        <div className={'_carousel rounded'}>
            <div className="slides-wrapper rounded">
                <motion.div
                    className="boxes-wrapper"
                    animate={{ x: id * -200 }}
                    transition={{ type: 'spring', stiffness: 80 }}
                >
                    {boxes}
                </motion.div>
            </div>
            <div className="indicators-wrapper">{indicators}</div>
        </div>
    )
}

export default Carousel;
