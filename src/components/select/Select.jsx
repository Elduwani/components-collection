import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { IoIosSearch } from "react-icons/io"
import colors from "./names.js"
import "./select.scss"

const Select = () => {
    const inputRef = useRef()
    const [selected, setSelected] = useState([])
    const [options, setOptions] = useState(colors)
    const [showOptions, setShowOptions] = useState(false)
    const maxItems = selected.length >= 2


    const search = event => {
        const val = event.target.value
        setShowOptions(true)

        const regex = new RegExp(val, 'gi')
        const data = colors.filter(color => color.name.match(regex) && !isSelected(color.id))
        if (data.length) setOptions(data)
        else setOptions([])
    }

    //If color is selected, do not include
    const isSelected = id => [...selected.map(el => el.id)].includes(id)
    const focus = () => inputRef.current && inputRef.current.focus()

    function handleOutsideClick(event) {
        // console.log(event.target)
        // console.log(event.currentTarget)
        // console.log(event.relatedTarget)
        if (!event.currentTarget.contains(event.relatedTarget)) setShowOptions(false)
    }

    useEffect(() => {
        //Skip an already selected color when updating Options
        const remainder = colors.filter(elem => !isSelected(elem.id))
        setOptions(remainder)
    }, [selected]);

    return (
        <div className="select-parent" onBlur={handleOutsideClick}>
            <div className="input-wrapper box-shadow">
                {
                    //Display selected items
                    selected.length ?
                        <div className="selected-parent">
                            {
                                selected.map(color =>
                                    <div className="selected" key={color.id} style={{ borderColor: color.color }}>
                                        <div className="circle"
                                            style={{ backgroundColor: color.color }}
                                        ></div>
                                        <div>{color.name}</div>
                                    </div>
                                )
                            }
                        </div>
                        : null
                }
                {
                    // MaxLength of items selectable 
                    !maxItems ?
                        <input
                            type="text"
                            className="select-input"
                            onChange={search}
                            placeholder="Search Palettes"
                            ref={inputRef}
                            onClick={() => setShowOptions(true)}
                        />
                        :
                        null
                }
                <div className="clear"
                    onClick={() => {
                        setSelected([])
                        setOptions(colors)
                        focus()
                    }}
                ><IoIosSearch /></div>
            </div>

            {
                //Display the dropdown of options
                <AnimatePresence>
                    {showOptions ?
                        <motion.div
                            className="options-parent"
                            initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                            transition={{ type: "spring", mass: 0.5 }}
                        >
                            {options.map(color => {
                                return (
                                    <div
                                        key={color.id}
                                        className="option"
                                        onClick={() => {
                                            if (!maxItems) {
                                                setSelected([...selected, color])
                                                inputRef.current.value = ""
                                            }
                                            focus()
                                        }}
                                        style={{ borderColor: color.color }}
                                    >
                                        <div className="circle" style={{ backgroundColor: color.color }}></div>
                                        <div>{color.name}</div>
                                    </div>
                                )
                            })}
                        </motion.div>
                        : null
                    }
                </AnimatePresence>
            }
        </div>
    );
}

export default Select;
