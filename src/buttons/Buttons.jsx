import React, { useState } from 'react'
import { motion, useMotionValue, useTransform, useCycle } from "framer-motion"
import './buttons.css'
import { white } from 'ansi-colors'

const Buttons = () => {

    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(false)
    const [state3, setState3] = useState(false)

    const [x, cycleX] = useCycle(0, 22, 42)

    return (
        <div className="btn-wrapper">
            <div
                // onClick={() => setState1(!state1)}
                className={`ios-btn-wrapper ${state1 ? 'activ' : ''}`}
            >
                <motion.div
                    className="toggle-icon"
                    animate={{ x: x }}
                    onTap={() => cycleX()}
                />
            </div>
            <div
                onClick={() => setState2(!state2)}
                className={`android-btn-wrapper ${state2 ? 'active' : ''}`}
            >
                <motion.div
                    animate={{ x: x }}
                    onTap={() => cycleX()}
                    className="toggle-icon"
                />
            </div>
            <div
                onClick={() => setState3(!state3)}
                className={`windows-btn-wrapper ${state3 ? 'active' : ''}`}
            >
                <div className="toggle-icon"></div>
            </div>
        </div>
    )
}

export default Buttons
