import React from 'react';
import "./buttons.scss"

const RadioButton = ({ selected, setSelected }) => {
    return (
        <div
            onClick={() => setSelected(!selected)}
            className={`radio-btn-wrapper ${selected ? "selected" : ""}`}
        >
            <div className="radio-btn-inner"></div>
        </div>
    );
}

export default RadioButton;
