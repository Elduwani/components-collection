import React, { useState } from 'react'
import Button from './Button'
import './buttons.css'

const Buttons = () => {

    const [mode, setMode] = useState(false)
    let parentWidth = 80, parentHeight = 35

    return (
        <div
            className="btn-wrapper"
            style={{ background: mode ? '#aaa' : '#35477d' }}
        >
            <Button
                name="ios-btn-wrapper"
                pWidth={parentWidth}
                pHeight={parentHeight}
                cWidth={30}
                cHeight={30}
                rounded={true}
                offset={3}
            />
            <Button
                name="android-btn-wrapper"
                pWidth={60}
                pHeight={20}
                cWidth={36}
                cHeight={36}
                rounded={true}
                mode={mode}
                setMode={setMode}
            />
            <Button
                name="windows-btn-wrapper"
                pWidth={parentWidth}
                pHeight={parentHeight}
                cWidth={parentHeight}
                cHeight={parentHeight}
            />
        </div >
    )
}

export default Buttons
