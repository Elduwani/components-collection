import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import "./progress.css"

const Progress = () => {
    const [state, setState] = useState(10)

    return (
        <div className="progress-wrapper flex">
            <div className="progress-parent">
                <div className="progress" style={{ width: state + "%" }}></div>
            </div>
            <div className="buttons-wrapper">
                <FiChevronLeft
                    className="icon"
                    onClick={() => {
                        if (state > 5) {
                            if (state < 11) setState(st => st - 1)
                            else setState(st => st - 10)
                        }
                    }}
                />
                <FiChevronRight
                    className="icon"
                    onClick={() => {
                        if ((state < 95)) {
                            if (state > 90) setState(st => st + 1)
                            else setState(st => st + 5)
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Progress;
