import React from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion"
import { FiSun } from "react-icons/fi"
import "./brightnessController.css"

const BrightnessController = () => {


    const x = useMotionValue(0)
    const end = 200

    const rotate = useTransform(
        x, [0, end], [0, 90]
    )
    const background = useTransform(
        x, [0, end], ["#35477d", "#e6d3a7"]
    )
    const iconColor = useTransform(
        x, [0, end], ["#fff", "#35477d"]
    )

    return (
        <motion.div className="b-c-wrapper rounded" style={{ background }}>
            <div className="items">
                <motion.div
                    style={{
                        display: "flex",
                        rotate,
                        alignItems: "center",
                        justifyContent: "center",
                        color: iconColor
                    }}>
                    <FiSun className="b-icon" />
                </motion.div>
                <div className="b-slider">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 200 }}
                        dragElastic={0.1}
                        style={{ x, background: iconColor }}
                        className="b-slider-button"
                    ></motion.div>
                </div>
            </div>
            <div className="b-overlay"></div>
        </motion.div>
    );
}

export default BrightnessController;
