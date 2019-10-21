import React from 'react';
import { motion, useCycle } from "framer-motion"

const Button = (props) => {

    const { name, pWidth, pHeight, cWidth, cHeight, rounded, offset, mode, setMode } = props
    const end = (pWidth - cWidth) - (offset ? offset : 0)
    const [x, animate] = useCycle(offset || 0, end)

    return (
        <div
            style={{
                width: pWidth,
                height: pHeight,
                marginBottom: 15,
                marginTop: 15,
                cursor: "pointer",
                borderRadius: rounded ? 999 : 3,
            }}
            className={`btn-container ${name} ${x === end ? 'active' : ''}`}
            onClick={() => {
                animate()
                if (setMode) setMode(!mode)
            }}
        >
            <motion.div
                className="toggle-icon"
                animate={{ x: x }}
                transition={{ type: "spring", mass: 0.5 }}
                style={{
                    width: cWidth || pHeight - 5,
                    height: cHeight || pHeight - 5,
                    borderRadius: rounded ? 999 : 3
                }}
            />
        </div>
    )
}

export default Button;
