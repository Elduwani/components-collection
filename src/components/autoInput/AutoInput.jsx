import React, { useState, useRef, createRef, useEffect } from 'react'
import Loader from "../loader/Loader"
import "./autoInput.scss"

const formData = {
    "card": "",
    "mm": "",
    "dd": "",
    "yy": "",
    "cvv": "",
}

export default function AutoInput() {
    const [form, setForm] = useState(formData)
    const [state, setState] = useState(null)
    const [text, setText] = useState("Pay")
    const xRefs = {}

    const collections = ["Card Information", "MM", "DD", "YY", "CVV"]
    useRef(collections.map((_, i) => {
        // const name = collections[i].split(" ")[0].toLowerCase()
        xRefs[i] = createRef()
    }))

    let input1 = xRefs[0].current,
        input2 = xRefs[1].current,
        input3 = xRefs[2].current,
        input4 = xRefs[3].current,
        input5 = xRefs[4].current

    function handleChange(e) {
        const { name, value } = e.target
        const isNumber = Math.sign(value) >= 0


        if (isNumber) {

            if (input1.value.length === 3) return input2.focus()
            if (input2.value.length === 3) return input3.focus()
            if (input3.value.length === 3) return input4.focus()
            if (input4.value.length === 3) return input5.focus()

            setForm({ ...form, [name]: value })
        }

        return
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
                    collections.map((elem, i) => {
                        const name = elem.split(" ")[0].toLowerCase()
                        return (
                            <input
                                key={i}
                                name={name}
                                type="text"
                                placeholder={elem}
                                onChange={handleChange}
                                value={form[name]}
                                ref={xRefs[i]}
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
