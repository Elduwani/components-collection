import React, { useState, useRef, createRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCcVisa } from "react-icons/fa"
import Loader from "../loader/Loader"
import "./payment.scss"

const formData = { "card": "", "mm": "", "dd": "", "yy": "", "cvv": "" }

export default function Payment() {
    const [form, setForm] = useState(formData)
    const [state, setState] = useState(null)
    const [text, setText] = useState("Pay")
    const maxLengths = {}
    const refs = {}

    const isLoading = state === "loading"
    const isSuccess = state === "success"

    const collection = Object.keys(formData)
    useRef(collection.map((_name, i) => {
        refs[i] = createRef()
        if (_name === "card") return maxLengths[_name] = 12
        if (_name === "cvv") return maxLengths[_name] = 3
        return maxLengths[_name] = 2
    }))

    function handleChange(e) {
        const { name, value } = e.target
        const isNumber = Math.sign(value) >= 0
        if (isNumber) setForm({ ...form, [name]: value.trim() })
    }

    function handleSubmit() {
        if (!isLoading && text === "Pay") {
            console.log("Processing...")
            setState("loading")
            setText("Processing")
        } else {
            console.log("Please wait...")
        }
        return
    }

    useEffect(() => {
        let timer1
        if (isLoading) {
            timer1 = setTimeout(() => {
                setState("success")
                setText("Payment Successful")
                setForm(formData)
            }, 5000);
        }
        return () => clearTimeout(timer1)
    }, [isLoading]);

    useEffect(() => {
        let timer1
        if (text === "Payment Successful") {
            timer1 = setTimeout(() => {
                setState("")
                setText("Pay")
            }, 5000);
        }
        return () => clearTimeout(timer1)
    }, [text]);

    return (
        <div className="inputs-wrapper">
            <div className="inputs-container">
                <div className="input">
                    <label htmlFor="card">Card Number</label>
                    <div className="container">
                        <input
                            name="card"
                            type="text"
                            placeholder="card number"
                            onChange={handleChange}
                            value={form["card"]}
                            maxLength={maxLengths["card"]}
                            ref={refs[0]}
                        />
                        {
                            <motion.div
                                initial={false}
                                animate={{
                                    x: form["card"].length >= 4 ? 0 : -10,
                                    opacity: form["card"].length >= 4 ? 1 : 0,
                                }}
                                transition={{ duration: 3, type: "spring" }}
                            ><FaCcVisa /></motion.div>
                        }
                    </div>
                </div>
                <div className="input group">
                    <div className="expiration">
                        <label htmlFor="mm">Expiration</label>
                        <div className="container">
                            <input
                                name="mm"
                                type="text"
                                placeholder="mm"
                                onChange={handleChange}
                                value={form["mm"]}
                                maxLength={maxLengths["mm"]}
                                ref={refs[1]}
                            />
                            <span></span>
                            <input
                                name="dd"
                                type="text"
                                placeholder="dd"
                                onChange={handleChange}
                                value={form["dd"]}
                                maxLength={maxLengths["dd"]}
                                ref={refs[2]}
                            />
                            <span></span>
                            <input
                                name="yy"
                                type="text"
                                placeholder="yy"
                                onChange={handleChange}
                                value={form["yy"]}
                                ref={refs[3]}
                                maxLength={maxLengths["yy"]}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV</label>
                        <div className="container">
                            <input
                                name="cvv"
                                type="text"
                                placeholder="cvv"
                                onChange={handleChange}
                                value={form["cvv"]}
                                maxLength={maxLengths["cvv"]}
                                ref={refs[4]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                style={{
                    backgroundColor: isLoading ? "#373741" :
                        isSuccess ? "#59a985" : "#35477d"
                }}
            >
                {
                    isLoading ?
                        <Loader size={25} stroke={3} pausable={false} color='#fff' duration={0.5} />
                        : text
                }
            </button>
        </div>
    )
}
