import React, { useState, useRef, createRef, useEffect } from 'react'
import Loader from "../loader/Loader"
import "./autoInput.scss"

const formData = { "card": "", "mm": "", "dd": "", "yy": "", "cvv": "" }

export default function AutoInput() {
    const [form, setForm] = useState(formData)
    const [state, setState] = useState(null)
    const [text, setText] = useState("Pay")
    // const [index, setIndex] = useState(0)
    const maxLengths = {}
    const refs = {}

    const collection = Object.keys(formData)
    useRef(collection.map((_name, i) => {
        refs[i] = createRef()
        if (_name === "card") return maxLengths[_name] = 4
        if (_name === "cvv") return maxLengths[_name] = 3
        return maxLengths[_name] = 2
    }))

    function handleChange(e) {
        const { name, value } = e.target
        const isNumber = Math.sign(value) >= 0
        if (isNumber) setForm({ ...form, [name]: value })
    }

    function handleSubmit() {
        setState("loading")
        setText("Processing")
        console.log(form)
    }

    useEffect(() => {
        let timer1
        if (state === "loading") {
            timer1 = setTimeout(() => {
                setState(null)
                setText("Payment Successful")
                setForm(formData)
            }, 5000);
        }
        return () => clearTimeout(timer1)
    }, [state]);

    useEffect(() => {
        let timer1
        if (text === "Payment Successful") {
            timer1 = setTimeout(() => {
                setText("Pay")
            }, 5000);
        }
        return () => clearTimeout(timer1)
    }, [text]);

    return (
        <div className="autofocus-wrapper">
            <div className="inputs">
                {
                    collection.map((name, i) => {
                        return (
                            <input
                                key={i}
                                name={name}
                                type="text"
                                placeholder={name === "card" ? name + " number" : name}
                                onChange={handleChange}
                                value={form[name]}
                                ref={refs[i]}
                                maxLength={maxLengths[name]}
                            />
                        )
                    })
                }
            </div>
            <button onClick={handleSubmit}>
                {
                    state === "loading" ?
                        <Loader size={20} stroke={5} color='#6c5b7b' duration={0.5} />
                        : text
                }
            </button>
        </div>
    )
}
