import React, { useState, useRef } from 'react'
import { motion, useDragControls } from "framer-motion"
import { createChartData, formatNumber } from "./createResource"

function ControlSlider({ name, value = 50 }) {
    const ref = useRef(null)
    const dragControls = useDragControls()

    function startDrag(event) {
        dragControls.start(event, { snapToCursor: true })
    }

    return <div className="control-container">
        <div className="info"><p>{name}</p><p>{value}</p></div>
        <div className="slider" ref={ref} onMouseDown={startDrag}>
            <div className="slider-inner" style={{ width: value + "%" }}></div>
            <motion.div
                drag={"x"}
                dragConstraints={ref}
                dragElastic={false}
                dragConstraints={dragControls}
                className="slider-handle"
            ></motion.div>
        </div>
    </div>
}

export default function DemoChart() {
    const [weeks, setWeeks] = useState(6)
    const [maxAmount, setMaxAmount] = useState(20000)
    const [barWidth, setBarWidth] = useState(30) //in pixels
    const { yAxes, expenditure } = createChartData(maxAmount, weeks)

    return (
        <div className="demo-chart-wrapper">
            <div className="left-section controls-wrapper">
                <ControlSlider name="Bar width" value={50} />
            </div>
            <div className="demo-chart-container right-section">
                <div className="y-axis">
                    {
                        yAxes.map((num, i) => <div key={num + i}>{num > 0 ? "$" + formatNumber(num, true) : "$500"}</div>)
                    }
                </div>
                <div className="graph" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${weeks}, 1fr)`,
                    gridAutoRows: `100%`
                }}>
                    {
                        Array(weeks).fill("w").map((_, i) => {
                            return <div key={i} className="bar-container">
                                <div
                                    data-amount={`$${formatNumber(expenditure[i])}`}
                                    style={{
                                        height: (expenditure[i] / maxAmount) * 100 + "%",
                                        width: barWidth
                                    }}></div>
                            </div>
                        })
                    }
                </div>
                <div className="x-axis">
                    {
                        Array(weeks).fill("w").map((_, i) => <div key={i}>Week {i + 1}</div>)
                    }
                </div>
            </div>
        </div>
    )
}
