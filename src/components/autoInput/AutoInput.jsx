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
    const refs = {}

    const collections = ["Card Information", "MM", "DD", "YY", "CVV"]
    useRef(collections.map((_, i) => {
        const name = collections[i].split(" ")[0].toLowerCase()
        refs[name] = createRef()
    }))

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    function handleSubmit() {
        setState("loading")
        setText("Processing")
        console.log(form)
    }

    useEffect(() => {
        let input1 = refs["card"].current,
            input2 = refs["mm"].current,
            input3 = refs["dd"].current,
            input4 = refs["yy"].current,
            input5 = refs["cvv"].current

        if (input1.value.length >= 11) input2.focus()
        if (input2.value.length >= 2) input3.focus()
        if (input3.value.length >= 2) input4.focus()
        if (input4.value.length >= 2) input5.focus()

    }, [form]);

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
                                ref={refs[name]}
                            />
                        )
                    })
                }
            </div>
            <button onClick={handleSubmit}>
                {
                    state === "loading" ?
                        <Loader size={25} stroke={5} color='#6c5b7b' duration={0.5} />
                        : text
                }
            </button>
        </div>
    )
}
