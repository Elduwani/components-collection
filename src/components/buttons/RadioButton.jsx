import React, { useState, useEffect } from 'react';
import "./buttons.css"

const RadioButton = ({ selected }) => {
    const [state, setState] = useState(selected)

    useEffect(() => {
        setState(selected)
    }, [selected])

    return (
        <div
            onClick={() => setState(!state)}
            className={`radio-btn-wrapper ${selected ? "selected" : ""}`}
        >
            <div className="radio-btn-inner"></div>
        </div>
    );
}

export default RadioButton;
