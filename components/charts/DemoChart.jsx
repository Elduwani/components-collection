import { motion } from "framer-motion"
import { useRef, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import Button from '../buttons/Button'
import ControlSlider from "./ControlSlider"
import { formatNumber, useCreateChartData } from "./createResource"

export default function DemoChart() {
    const sliderRef = useRef(null)

    const [maxAmount] = useState(10000)
    const [weeks, setWeeks] = useState(6)
    const [barWidth, setBarWidth] = useState(20) //in pixels
    const [gridOpacity, setGridOpacity] = useState(100) //in pixels
    const [radius, setRadius] = useState(0) //in pixels
    const [state, setState] = useState(useCreateChartData(maxAmount))
    const { yAxes, expenditure } = state

    const useRefetch = () => setState(useCreateChartData(maxAmount, true))

    return (
        <div className="flex flex-col-reverse md:grid md:grid-cols-3 bg-gray-800 border border-gray-700 text-sm rounded-lg overflow-hidden">
            <div ref={sliderRef} className="bg-gray-900 bg-opacity-40 p-6 space-y-6">
                <ControlSlider name="Bar thickness" startAt={50} cb={setBarWidth} min={10} max={25} />
                <ControlSlider name="Space horizontally" startAt={60} cb={setWeeks} min={5} max={9} />
                <ControlSlider name="Rounding" startAt={10} cb={setRadius} min={0} max={30} />
                <ControlSlider name="Grid opacity" startAt={20} cb={setGridOpacity} min={0} max={100} />
                <Button onClick={useRefetch} bg="bg-gray-700">
                    <span>Randomize data</span> <FiRefreshCw className="text-blue-400" />
                </Button>
            </div>
            <div className="p-4 grid grid-cols-12 grid-rows-1 md:col-span-2">
                <div className="hidden md:flex flex-col border-b border-gray-700">
                    {
                        yAxes.map((num, i) =>
                            <p key={num + i} className="flex-1 text-xs">
                                {"$" + formatNumber(num, true)}
                            </p>
                        )
                    }
                </div>
                <div className="grid col-span-full md:col-span-11 border-b border-gray-700 relative"
                    style={{
                        minHeight: 200,
                        gridTemplateColumns: `repeat(${weeks}, 1fr)`,
                    }}
                >
                    {
                        Array(weeks).fill("w").map((_, i) => {
                            //Calculate percentage of height relative to parent
                            const height = (expenditure[i] / maxAmount) * 100
                            const number = formatNumber(state.expenditure[i])
                            // console.log(number);

                            return (
                                <div key={i} className="bar-container flex items-end justify-center z-10">
                                    <motion.div
                                        className={`bar bg-gradient-to-t from-blue-600 ${height > 85 ? "to-red-400" : "to-blue-300"} relative`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: height + "%" }}
                                        transition={{ type: "spring", mass: 0.5 }}
                                        style={{
                                            width: barWidth,
                                            borderTopLeftRadius: radius,
                                            borderTopRightRadius: radius,
                                        }}>
                                        <span className="text-xs absolute -top-5 hidden">{number}</span>
                                    </motion.div>
                                </div>
                            )
                        })
                    }
                    {
                        <div className="flex flex-col absolute left-0 top-0 w-full h-full z-0">{
                            yAxes.map((_, i) =>
                                <div key={i}
                                    className="flex-1 border-t border-gray-600"
                                    style={{ opacity: gridOpacity / 100 }}
                                ></div>
                            )
                        }
                        </div>
                    }
                </div>
                <div className="pt-1 flex md:col-start-2 col-span-full">
                    {
                        Array(weeks).fill("w").map((_, i) =>
                            <span
                                key={i}
                                className="flex-1 grid place-items-center text-xs text-gray-400"
                            >W{i + 1}</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
