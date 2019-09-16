import React, { useState, useEffect } from 'react';
import "./calculator.css"

const Calculator = () => {

    document.title += " Calculator | Elduwani"

    const [prevValue, setPrevValue] = useState('')
    const [currentValue, setCurrentValue] = useState('')
    const [operator, setOperator] = useState(null)
    const [displayData, setDisplayData] = useState('')
    const [prevResult, setPrevResult] = useState(0)
    const [result, setResult] = useState(0)
    const [lastEntry, setLastEntry] = useState(null)

    useEffect(() => {
        if (currentValue && prevValue) {
            if (lastEntry !== 'dot') evaluate()
        }
        // eslint-disable-next-line
    }, [currentValue, prevValue])

    const handleInput = e => {
        const val = e.target.innerText
        setCurrentValue(input => input + val)
        setDisplayData(input => input + val)
        setLastEntry(null)
    }

    const handleOperation = (operand) => {
        if (result) setPrevResult(result)

        if (lastEntry !== 'operator') {
            setOperator(operand)
            setLastEntry("operator")
            setDisplayData(input => input + operand)

            const val = currentValue
            setPrevValue(val)
            setCurrentValue('')
        }
    }

    const modulo = () => {
        const newVal = result / 100
        setResult(newVal)
        setDisplayData(x => x + '/100')
    }

    const addDot = () => {
        if (currentValue.indexOf('.') === -1) {
            setDisplayData(input => input + '.')
            setCurrentValue(val => val + '.')
            setLastEntry('dot')
        }
    }

    const evaluate = () => {
        let computed = 0
        const prev = prevResult || parseFloat(prevValue)
        const curr = parseFloat(currentValue)

        switch (operator) {
            case "/":
                computed = prev / curr
                break
            case "x":
                computed = prev * curr
                break
            case "-":
                computed = prev - curr
                break
            case "+":
                computed = prev + curr
                break
            default:
                break;
        }

        if (String(computed).indexOf('.') > 0) computed = computed.toFixed(2)
        setResult(computed)
    }

    const reset = () => {
        setPrevValue('')
        setCurrentValue('')
        setOperator(null)
        setDisplayData('')
        setPrevResult(0)
        setResult(0)
        setLastEntry(null)
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="screen-group">
                    <div className="input">{displayData || "0"}</div>
                    <div className="result">{result}</div>
                </div>
                <div className="keypad-group">
                    <div className="sub-button-group white">
                        <div
                            className="button white"
                            onClick={reset}
                        >C</div>
                        <div className="button" onClick={handleInput}>7</div>
                        <div className="button" onClick={handleInput}>4</div>
                        <div className="button" onClick={handleInput}>1</div>
                        <div className="button" onClick={handleInput}>00</div>
                    </div>
                    <div className="sub-button-group">
                        <div className="button white">+/-</div>
                        <div className="button" onClick={handleInput}>8</div>
                        <div className="button" onClick={handleInput}>5</div>
                        <div className="button" onClick={handleInput}>2</div>
                        <div className="button" onClick={handleInput}>0</div>
                    </div>
                    <div className="sub-button-group">
                        <div className="button white" onClick={modulo}>%</div>
                        <div className="button" onClick={handleInput}>9</div>
                        <div className="button" onClick={handleInput}>6</div>
                        <div className="button" onClick={handleInput}>3</div>
                        <div className="button white" onClick={addDot}>.</div>
                    </div>
                    <div className="sub-button-group">
                        <div className="button operator" onClick={() => handleOperation('/')}>/</div>
                        <div className="button operator" onClick={() => handleOperation('x')}>x</div>
                        <div className="button operator" onClick={() => handleOperation('-')}>-</div>
                        <div className="button operator" onClick={() => handleOperation('+')}>+</div>
                        <div className="button operator">
                            <span className="round">=</span>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer calc-footer">❤ El</footer>
        </>
    );
}

export default Calculator;
