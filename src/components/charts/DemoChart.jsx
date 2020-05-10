import React, { useState } from 'react'
import ControlSlider from "./ControlSlider"
import { createChartData, formatNumber } from "./createResource"

export default function DemoChart() {
    const [weeks] = useState(6)
    const [maxAmount] = useState(20000)
    const [barWidth, setBarWidth] = useState(20) //in pixels
    const { yAxes, expenditure } = createChartData(maxAmount, weeks)

    return (
        <div className="demo-chart-wrapper">
            <div className="left-section controls-wrapper">
                <ControlSlider name="Bar width" value={barWidth} cb={setBarWidth} />
                <ControlSlider name="Set corner radius" value={50} cb={null} />
                <ControlSlider name="Space horizontally" value={30} cb={null} />
                <ControlSlider name="Grid opacity" value={0.5} cb={null} />
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
