import { useState } from 'react'
import useInterval from "../../functions/useInterval"
import { motion } from "framer-motion"
import "./carousel.scss"
// import { FiChevronDown } from "react-icons/fi"

const Carousel = ({ count }) => {
    const boxWidth = 260
    let num = count || 10

    const [id, setID] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const colors = ["#08d9d6", '#59a985', '#6a5acd', '#e6d3a7', '#2e79ba']
    const words = ["the", 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog']

    useInterval(() => {
        setID(st => st < num - 1 ? st + 1 : 0)
    }, isRunning ? 2000 : null, id)

    return (
        <div className={'_carousel rounded'}>
            <div className="slides-wrapper rounded" style={{ width: boxWidth }}>
                <motion.div
                    className="boxes-wrapper"
                    animate={{ x: id * -boxWidth }}
                    transition={{ type: 'spring', mass: 0.5 }}
                >
                    {
                        Array(num).fill('c').map((_, i) => {
                            const currentColor = colors[i] || colors[num % i]
                            return <div key={i}
                                onClick={(() => {
                                    setID(i)
                                    setIsRunning(false)
                                })}
                                className="box rounded"
                                style={{ border: `1px solid ${currentColor}`, color: currentColor }}
                            >
                                <span>{words[i] || "-_-"}</span>
                            </div>
                        }
                        )
                    }
                </motion.div>
            </div>
            <div className="indicators-wrapper">
                {
                    Array(num).fill('i').map((_, i) => {
                        const currentColor = colors[i] || colors[num % i]
                        return <div key={i}
                            className={`indicator ${id === i ? 'selected' : ''}`}
                            onClick={() => {
                                setID(i)
                                if (!isRunning) setIsRunning(true)
                            }}
                        >
                            <div style={{ background: id === i && currentColor }}></div>
                        </div>
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Carousel;
