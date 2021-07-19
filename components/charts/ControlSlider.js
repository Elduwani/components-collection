import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ControlSlider({ name, startAt = 0, cb, min = 0, max = 10 }) {
    const [maxInput, setMaxInput] = useState(20)

    // Calculate X percent of number { (number / 100) * X }
    // Initial start position should be converted back from percentage to position value

    const ref = useRef(null)
    const xPosition = useMotionValue(20);
    const value = useTransform(xPosition, [0, maxInput], [min, max]);
    const progressScaleX = useTransform(xPosition, [0, maxInput], [0, 1]);

    const callback = () => cb && cb(Math.round(value.current))

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

    return <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-400"><div>{name}</div>
            <div>{Math.round(value.current)}</div>
        </div>
        <div ref={ref} className="flex justify-start items-center rounded-full relative mb-2">
            <div className="w-full overflow-hidden h-1 rounded bg-gray-700">
                <motion.div className="bg-blue-600 origin-left h-full" style={{ scaleX: progressScaleX }} />
            </div>
            <motion.div
                drag={"x"}
                dragElastic={0.08}
                dragMomentum={false}
                dragConstraints={ref}
                dragTransition={{ bounceDamping: 30, bounceStiffness: 800 }}
                style={{ x: xPosition }}
                onDrag={callback}
                className="handle w-5 h-5 rounded-full absolute shadow-md bg-blue-300 cursor-pointer"
            ></motion.div>
        </div>
    </div>
}