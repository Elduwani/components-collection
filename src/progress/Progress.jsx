import React, { useState } from 'react'
import StorageDetails from "./StorageDetails"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import "./progress.css"

const Progress = () => {
    const [state, setState] = useState(40)

    return (
        <>
            <div className="progress-wrapper flex">
                <div className="progress-parent">
                    <div className="progress" style={{ width: state + "%" }}></div>
                </div>
                <div className="buttons-wrapper">
                    <FiChevronLeft
                        className="icon"
                        onClick={() => {
                            if (state > 30) setState(st => st - 5)
                        }}
                    />
                    <FiChevronRight
                        className="icon"
                        onClick={() => {
                            if ((state < 95)) setState(st => st + 5)
                        }}
                    />
                </div>
            </div>
            <StorageDetails state={state} />
        </>
    );
}

export default Progress;
