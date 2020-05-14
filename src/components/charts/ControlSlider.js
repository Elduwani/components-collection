import React, { useEffect } from "react"
import { motion, useMotionValue, useTransform, useDragControls } from "framer-motion";

export default function ControlSlider({
    name, startAt = 0, cb, min = 0, max = 10, wd, pd
}) {
    const handleSize = 20
    // Container width is 300px, minus 20px padding left & right = 260
    // handlesize accounts for the width of the draggable handle
    const maxInput = wd - (pd * 2) - (handleSize)

    // Calculate X percent of number { (number / 100) * X }
    // Initial start position should be converted back from percentage to position value
    const initialStartPos = (maxInput / 100) * startAt

    const ref = React.useRef(null)
    const xPosition = useMotionValue(initialStartPos);
    const dragControls = useDragControls()
    const value = useTransform(xPosition, [0, maxInput], [min, max]);
    const progressScaleX = useTransform(xPosition, [0, maxInput], [0, 1]);

    const callback = () => cb && cb(Math.round(value.current))

    // !important
    // on componentMount update props state with computed xPosition value 
    // otherwise props state is out of sync with xPosition value
    useEffect(() => { callback() }, [value]);

    return <div className="control-container">
        <div className="info"><div>{name}</div>
            <div>{Math.round(value.current)}</div>
        </div>

        <div className="slider" ref={ref}
            onMouseDown={e => {
                dragControls.start(e, { snapToCursor: true })
                callback()
            }}
        >
            <div className="bar">
                <motion.div className="progress" style={{ scaleX: progressScaleX }} />
            </div>
            <motion.div
                className="handle"
                drag={"x"}
                dragElastic={0.08}
                dragMomentum={false}
                dragConstraints={ref}
                dragControls={dragControls}
                dragTransition={{ bounceDamping: 30, bounceStiffness: 800 }}
                style={{ x: xPosition, width: handleSize, height: handleSize }}
                onDrag={callback}
            ></motion.div>
        </div>
    </div>
}