import React from 'react';
import "./buttons.scss"

const RadioButton = ({ isSelected }) => {
    return (
        <div
            className={`radio-btn-wrapper ${isSelected ? "selected" : ""}`}
        >
            <div className="radio-btn-inner"></div>
        </div>
    );
}

export default RadioButton;
