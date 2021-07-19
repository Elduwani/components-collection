import { useEffect, useRef, useState } from 'react'
import useInterval from "../../functions/useInterval"
import { motion } from "framer-motion"
// import "./carousel.scss"

export default function Carousel() {
    const containerRef = useRef(null)
    let [boxWidth, setBoxWidth] = useState(260)
    let spacing = 20

    const [id, setID] = useState(0)
    const [isRunning, setIsRunning] = useState(true)
    const colors = ["#08d9d6", '#59a985', '#6a5acd', '#e6d3a7', '#2e79ba']
    const words = ["the", 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog']
    const count = words.length

    useInterval(() => {
        setID(st => st < count - 1 ? st + 1 : 0)
    }, isRunning ? 2000 : null, id)

    useEffect(() => {
        const { clientWidth } = containerRef.current || {}
        setBoxWidth(clientWidth);
    }, [])

    return (
        <div className={`
            border border-gray-700 bg-gray-800 rounded-lg overflow-hidden
            flex p-8 items-center justify-center flex-col
        `}>
            <div ref={containerRef} className={`max-w-full cursor-pointer mb-10`}>
                <motion.div
                    className="h-full flex"
                    animate={{ x: id * -(boxWidth + spacing) }}
                    transition={{ type: 'spring', mass: 0.5 }}
                >
                    {
                        Array(count).fill('c').map((_, i) => {
                            const currentColor = colors[i] || colors[count % i]

                            return <div key={i}
                                onClick={(() => {
                                    setID(i)
                                    setIsRunning(false)
                                })}
                                className={`p-3 py-6 border grid place-items-center rounded-lg flex-shrink-0`}
                                style={{
                                    borderColor: currentColor,
                                    color: currentColor,
                                    width: boxWidth,
                                    marginRight: spacing
                                }}
                            >
                                <span className="text-5xl">{words[i] || "-_-"}</span>
                            </div>
                        }
                        )
                    }
                </motion.div>
            </div>
            <div className="w-5/6 flex items-center justify-center space-x-2 cursor-pointer">
                {
                    Array(count).fill('i').map((_, i) => {
                        const isActive = id === i

                        return <div key={i}
                            className={`indicator flex items-center justify-center h-5 ${isActive && "selected"}`}
                            onClick={() => {
                                setID(i)
                                if (!isRunning) setIsRunning(true)
                            }}
                        >
                            <span className={`h-1 w-full rounded ${isActive ? "bg-blue-500" : "bg-gray-500"}`}></span>
                        </div>
                    }
                    )
                }
            </div>
        </div>
    )
}