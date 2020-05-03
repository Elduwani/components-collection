import React, { useState } from 'react'
import { motion, useCycle } from "framer-motion"
import { IoMdSunny, IoIosMoon } from "react-icons/io"
import Button from './Button'
import './buttons.scss'

const Buttons = () => {
    const [darkMode, setDarkMode] = useState(true)
    const [size, growSVG] = useCycle(20, 40)
    const text = darkMode ? "Dark" : "Light"
    const transition = { type: "spring", mass: 0.5 }

    return (
        <div className="btn-wrapper"
            style={{ background: darkMode ? '#35477d' : '#fff' }}
        >
            <div className="group">
                <motion.div
                    animate={{
                        width: darkMode ? size * 2 : size / 2,
                        height: darkMode ? size * 2 : size / 2
                    }}
                    transition={transition}
                >
                    <IoIosMoon className={!darkMode ? "dark fade" : ""} />
                </motion.div>
                <Button
                    name="android-btn-wrapper"
                    pWidth={60}
                    pHeight={20}
                    cWidth={36}
                    cHeight={36}
                    rounded={true}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    growSVG={growSVG}
                />
                <motion.div
                    animate={{ width: !darkMode ? size : 25, height: !darkMode ? size : 25 }}
                    transition={transition}
                >
                    <IoMdSunny className={darkMode ? "fade" : "dark"} />
                </motion.div>
            </div>
            <div className={`text ${!darkMode ? "dark" : ""}`}>{`${text} Mode`}</div>
        </div >
    )
}

// let parentWidth = 80, parentHeight = 35

/* <Button
    name="windows-btn-wrapper"
    pWidth={parentWidth}
    pHeight={parentHeight}
    cWidth={parentHeight}
    cHeight={parentHeight}
/> 
 <Button
    name="ios-btn-wrapper"
    pWidth={parentWidth}
    pHeight={parentHeight}
    cWidth={30}
    cHeight={30}
    rounded={true}
    offset={3}
/> 

*/

export default Buttons
