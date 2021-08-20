import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";

export default function ControlSlider({ name, startAt = 0, onChange, min = 0, max = 10 }) {
    const [maxInput, setMaxInput] = useState(20)

    // Calculate X percent of number { (number / 100) * X }
    // Initial start position should be converted back from percentage to position value

    const ref = useRef(null)
    const xPosition = useMotionValue(20);
    const value = useTransform(xPosition, [0, maxInput], [min, max]);
    const progressScaleX = useTransform(xPosition, [0, maxInput], [0, 1]);

    const callback = () => onChange && onChange(Math.round(value.current))

    useEffect(() => {
        const refWidth = ref.current.offsetWidth
        setMaxInput(refWidth)
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        // on componentMount update props state with computed xPosition value 
        // otherwise props state is out of sync with xPosition value
        const initialStartPos = (maxInput / 100) * startAt
        xPosition.set(initialStartPos)
        callback()
        // eslint-disable-next-line 
    }, [maxInput, startAt]);

    return (
        <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-400 capitalize"><div>{name}</div>
                <div>{Math.round(value.current)}</div>
            </div>
            <div ref={ref} className="flex justify-start items-center rounded-full relative mb-2">
                <div className="w-full overflow-hidden h-1 rounded bg-gray-700">
                    <motion.div className="bg-blue-600 origin-left h-full" style={{ scaleX: progressScaleX }} />
                </div>
                <motion.div
                    drag={"x"}
                    dragElastic={0}
                    dragMomentum={false}
                    dragConstraints={ref}
                    dragTransition={{ bounceDamping: 30, bounceStiffness: 800 }}
                    style={{ x: xPosition }}
                    onDrag={callback}
                    className="handle w-5 h-5 rounded-full absolute shadow-md bg-blue-300 cursor-pointer"
                ></motion.div>
            </div>
        </div>
    )
}

export const Slider = ({ min = 0, max, values, onChange, color = "bg-gray-700" }) => (
    <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
            <div
                {...props}
                style={{ ...props.style }}
                className={`_track h-1.5 w-full ${color}`}
            >{children}</div>
        )}
        renderThumb={({ props }) => (
            <div
                {...props}
                style={{ ...props.style }}
                className={`w-5 h-5 rounded-full bg-white outline-none`}
            />
        )}
    />
)