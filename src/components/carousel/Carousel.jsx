import React, { useState } from 'react'
import useInterval from "../../functions/useInterval"
import { motion } from "framer-motion"
import "./carousel.css"
// import { FiChevronDown } from "react-icons/fi"

const Carousel = ({ count }) => {
    let num = count || 5

    const [id, setID] = useState(0)
    const [paused, setPaused] = useState(false)
    const indicators = []
    const boxes = []
    const colors = ["#08d9d6", '#59a985', '#6a5acd', '#e6d3a7', '#2e79ba']

    useInterval(() => {
        setID(st => st < num - 1 ? st + 1 : 0)
    }, 3000, paused, setPaused)


    for (let i = 0; i < num; i++) {
        boxes.push(
            <div
                className="box rounded"
                key={i}
                style={{
                    backgroundColor: colors[i],
                    color: colors[i + 1] || colors[i - 3]
                }}
            >
                <span>{i + 1}</span>
            </div>
        )
        indicators.push(
            <div
                key={i}
                className={`indicator ${id === i ? 'selected' : ''}`}
                onClick={() => {
                    setID(i)
                    setPaused(true)
                }}
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
                    animate={{ x: id * -260 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                >
                    {boxes}
                </motion.div>
            </div>
            <div className="indicators-wrapper">{indicators}</div>
        </div>
    )
}

export default Carousel;
