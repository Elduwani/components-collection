import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaCcVisa } from "react-icons/fa"
import Button from './buttons/Button'
import Spinner from "./Spinner"

const formData = { card: "", mm: "", yy: "", cvv: "" }

export default function Payment() {
    const [form, setForm] = useState(formData)
    const [state, setState] = useState(null)
    const [text, setText] = useState("Pay")
    const maxLengths = {}

    const isLoading = state === "loading"

    Object.keys(formData).forEach((name) => {
        if (name === "card") maxLengths[name] = 19
        else if (name === "cvv") maxLengths[name] = 3
        else maxLengths[name] = 2
    })

    function hyphenate(val, interval) {
        let res = ""
        let temp = val.trim().replace(/-/g, "")

        for (let i = 0; i < temp.length; i++) {
            const current = temp[i]
            if (i > 0 && i % interval === 0) {
                res += "-" + current
                continue
            }
            res += current
        }

        return res
    }

    function handleChange(e) {
        const { name, value } = e.target
        const lastEntry = value[value.length - 1]
        const isNumber = value.match(/^(?=.*[0-9])[- +()0-9]+$/)

        if (isNumber || lastEntry === undefined) {
            const res = name === "card" ? hyphenate(value, 4) : value.trim()
            setForm({ ...form, [name]: res })
        }
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

    const styles = {
        wrapper: `text-gray-400 space-y-1`,
        container: `border flex pr-2 relative items-center border-gray-600 rounded-lg`,
        input: `bg-transparent placeholder-gray-400 text-white`,
        divider: `h-7 w-1 bg-gray-600 transform rotate-12 mx-4`
    }

    return (
        <div className="inputs-wrapper bg-gray-800 border border-gray-700 rotate rounded-lg p-4 space-y-3">
            <div className="space-y-2">
                <div className={styles.wrapper}>
                    <label htmlFor="card">Card Number</label>
                    <div className={styles.container}>
                        <input
                            name="card"
                            type="text"
                            placeholder="card number"
                            maxLength={maxLengths["card"]}
                            onChange={handleChange}
                            value={form["card"]}
                            className={styles.input}
                        />
                        {
                            <motion.div
                                initial={false}
                                animate={{
                                    x: form["card"].length >= 4 ? 0 : -10,
                                    opacity: form["card"].length >= 4 ? 1 : 0,
                                }}
                            >
                                <FaCcVisa className="text-3xl text-white" />
                            </motion.div>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className={styles.wrapper}>
                        <label htmlFor="mm">Expiration</label>
                        <div className={styles.container}>
                            <input
                                name="mm"
                                type="text"
                                placeholder="mm"
                                onChange={handleChange}
                                value={form["mm"]}
                                maxLength={maxLengths["mm"]}
                                className={styles.input}
                            />
                            <span className={styles.divider}></span>
                            <input
                                name="yy"
                                type="text"
                                placeholder="yy"
                                onChange={handleChange}
                                value={form["yy"]}
                                maxLength={maxLengths["yy"]}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <label htmlFor="cvv">CVV</label>
                        <div className={styles.container}>
                            <input
                                name="cvv"
                                type="text"
                                placeholder="cvv"
                                onChange={handleChange}
                                value={form["cvv"]}
                                maxLength={maxLengths["cvv"]}
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleSubmit} isLoading={isLoading}>
                {isLoading && <Spinner color="text-blue-600" />}
                <span>{text}</span>
            </Button>
        </div>
    )
}
