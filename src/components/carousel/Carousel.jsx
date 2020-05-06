import React, { useState } from 'react'
import useInterval from "../../functions/useInterval"
import { motion } from "framer-motion"
import "./carousel.scss"
// import { FiChevronDown } from "react-icons/fi"

const Carousel = ({ count }) => {
    const boxWidth = 260
    let num = count || 5

    const [id, setID] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const colors = ["#08d9d6", '#59a985', '#6a5acd', '#e6d3a7', '#2e79ba']
    const words = ["the", 'quick', 'brown', 'fox', 'jumped']

    useInterval(() => {
        setID(st => st < num - 1 ? st + 1 : 0)
    }, isRunning ? 3000 : null)

    return (
        <div className={'_carousel rounded'}>
            <div className="slides-wrapper rounded" style={{ width: boxWidth }}>
                <motion.div
                    className="boxes-wrapper"
                    animate={{ x: id * -boxWidth }}
                    transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                >
                    {
                        colors.map((_, i) => <div
                            key={i}
                            onClick={(() => setIsRunning(!isRunning))}
                            className="box rounded"
                            style={{ border: `1px solid ${colors[i]}`, color: colors[i] }}
                        >
                            <span>{words[i]}</span>
                        </div>
                        )
                    }
                </motion.div>
            </div>
            <div className="indicators-wrapper">
                {
                    colors.map((_, i) => <div
                        key={i}
                        className={`indicator ${id === i ? 'selected' : ''}`}
                        onClick={() => {
                            setID(i)
                            setIsRunning(true)
                        }}
                    >
                        <div style={{ background: id === i && colors[i] }}></div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Carousel;
