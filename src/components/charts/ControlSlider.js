import React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ControlSlider({
    name, value, cb
}) {
    //container width is 300px, minus 20px padding left & right = 260
    const ref = React.useRef(null)
    const maxInput = 240
    const x = useMotionValue(0);
    const progressScaleX = useTransform(x, [0, maxInput], [0, 1]);
    const barWidth = useTransform(x, [0, maxInput], [20, 60]);

    //useDragControls not importing from framer
    //onMouseDown={() => dragControls.start(event, { snapToCursor: true })}

    return <div className="control-container">
        <div className="info"><div>{name}</div><div>{value}</div></div>

        <div className="slider" ref={ref} >
            <div className="bar">
                <motion.div
                    className="progress"
                    style={{ scaleX: progressScaleX }}
                />
            </div>
            <motion.div
                className="handle"
                dragElastic={0.08}
                dragMomentum={false}
                dragConstraints={ref}
                style={{ x }}
                drag={"x"}
                onDrag={() => cb && cb(Math.floor(barWidth.current))}
                dragTransition={{ bounceDamping: 30, bounceStiffness: 800 }}
            ></motion.div>
        </div>
    </div>
}