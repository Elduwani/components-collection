import React, { useState } from 'react'
import { motion } from "framer-motion"
import StorageDetails from "./StorageDetails"
import { FiArrowUp } from "react-icons/fi"
import "./storage.scss"

const Storage = () => {
    const [openOptions, setOpenOptions] = useState(false)
    const options = [256, 500, 1000, 2000, 4000]
    const [diskSize, setDiskSize] = useState(options[0])
    const [total, setTotal] = useState(0)
    const used = Math.ceil((total / diskSize) * 100)
    const elemHeight = 50

    const digitize = (number) => number > 999 ? String(number).substring(0, 1) + "TB" : number + "GB"

    return (
        <div className="storage-wrapper">
            <div className="size flex">
                <p>{`${digitize(total)} / ${digitize(diskSize)}`}</p>
                <p className="flex-right">{used}% total</p>
            </div>
            <div className="progress-wrapper">
                <div className="progress" style={{ width: used + "%" }}></div>
            </div>
            <StorageDetails diskSize={diskSize} setTotal={setTotal} />
            <div
                className="selector-wrapper"
                style={{ height: elemHeight, userSelect: "none" }}
                onClick={() => setOpenOptions(!openOptions)}
                role="button"
            >
                <button> Choose drive size <FiArrowUp /></button>
                {
                    openOptions ?
                        <motion.div
                            className="options-container"
                            initial={{ bottom: 0, opacity: 0, scale: 0.8 }}
                            animate={{ bottom: elemHeight + 10, opacity: 1, scale: 1 }}
                            transition={{ type: "tween" }}
                        >
                            {
                                options.map(option =>
                                    <div
                                        key={option}
                                        className="option"
                                        onClick={() => setDiskSize(option)}
                                    >{digitize(option)}</div>
                                )
                            }
                        </motion.div>
                        : null
                }
            </div>
        </div>
    );
}

export default Storage;
