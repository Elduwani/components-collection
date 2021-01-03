import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion"
import { FiSun } from "react-icons/fi"
import "./brightnessController.scss"

const BrightnessController = () => {

    const ref = useRef(null)
    const x = useMotionValue(0)
    const end = 200

    const rotate = useTransform(
        x, [0, end], [0, 180]
    )
    const background = useTransform(
        x, [0, end], ["#35477d", "#e6d3a7"]
    )
    const iconColor = useTransform(
        x, [0, end], ["#fff", "#35477d"]
    )

    return (
        <motion.div className="b-c-wrapper rounded" style={{ background }}>
            <div className="container">
                <div>
                    <motion.div
                        style={{
                            // Sun icon container
                            rotate, //animated...
                            display: "grid",
                            placeItems: "center",
                            color: iconColor
                        }}>
                        <FiSun className="b-icon" />
                    </motion.div>
                </div>
                <div className="b-slider" ref={ref}>
                    <motion.div
                        // Dragable circle
                        drag="x"
                        dragElastic={0}
                        dragConstraints={ref}
                        style={{ x, background: iconColor }}
                        className="b-slider-button"
                    ></motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default BrightnessController;
