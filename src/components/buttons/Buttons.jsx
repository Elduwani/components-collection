import React from 'react'
import Button from './Button'
import './buttons.css'

const Buttons = () => {

    let parentWidth = 80, parentHeight = 35

    return (
        <div className="btn-wrapper">
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
