import React, { useState } from 'react'
import ControlSlider from "./ControlSlider"
import { motion } from "framer-motion"
import { useCreateChartData, formatNumber } from "./createResource"
import { FiRefreshCw } from 'react-icons/fi'

export default function DemoChart() {
    const sliderRef = React.useRef(null)
    const sliderPadding = 20

    const [maxAmount] = useState(20000)
    const [weeks, setWeeks] = useState(6)
    const [wrapperWidth, setWrapperWidth] = useState(320)
    const [barWidth, setBarWidth] = useState(20) //in pixels
    const [gridOpacity, setGridOpacity] = useState(100) //in pixels
    const [radius, setRadius] = useState(0) //in pixels
    const [state, setState] = useState(useCreateChartData(maxAmount))
    const { yAxes, expenditure } = state

    const useRefetch = () => setState(useCreateChartData(maxAmount, true))

    React.useEffect(() => {
        setWrapperWidth(sliderRef.current.clientWidth)
    }, [])

    return (
        <div className="demo-chart-wrapper">
            <div
                ref={sliderRef}
                className="left-section controls-wrapper"
                style={{ padding: sliderPadding }}
            >
                <ControlSlider wd={wrapperWidth} pd={sliderPadding}
                    name="Bar thickness" startAt={50} cb={setBarWidth} min={10} max={25} />

                <ControlSlider wd={wrapperWidth} pd={sliderPadding}
                    name="Space horizontally" startAt={80} cb={setWeeks} min={5} max={9} />

                <ControlSlider wd={wrapperWidth} pd={sliderPadding}
                    name="Rounding" startAt={10} cb={setRadius} min={0} max={30} />

                <ControlSlider wd={wrapperWidth} pd={sliderPadding}
                    name="Grid opacity" startAt={20} cb={setGridOpacity} min={0} max={100} />

                <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'tween' }}
                    className="controls-container">
                    <button onClick={useRefetch}>Randomize data <FiRefreshCw /></button>
                </motion.div>
            </div>
            <div className="demo-chart-container right-section">
                <div className="y-axis">
                    {
                        yAxes.map((num, i) => {
                            return <div key={num + i}>
                                {"$" + formatNumber(num, true)}
                                {/* {num > 0 ? "$" + formatNumber(num, true) : "$500"} */}
                            </div>
                        })
                    }
                </div>
                <div className="graph" style={{
                    display: 'grid',
                    gridAutoRows: `100%`,
                    gridTemplateColumns: `repeat(${weeks}, 1fr)`,
                }}>
                    {
                        Array(weeks).fill("w").map((_, i) => {
                            //Calculate percentage of height relative to parent
                            const height = (expenditure[i] / maxAmount) * 100

                            return <div key={i} className="bar-container">
                                <motion.div
                                    className={`bar ${height > 50 ? "red" : ""}`}
                                    data-amount={`$${formatNumber(state.expenditure[i])}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: height + "%" }}
                                    transition={{ type: "spring", mass: 0.5 }}
                                    style={{
                                        width: barWidth,
                                        borderTopLeftRadius: radius,
                                        borderTopRightRadius: radius,
                                    }}></motion.div>
                            </div>
                        })
                    }
                    {
                        <div className="gridlines-container">{
                            yAxes.map((_, i) => {
                                return <div key={i}
                                    className="gridline"
                                    style={{ opacity: gridOpacity / 100 }}
                                ></div>
                            })
                        }
                        </div>
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
