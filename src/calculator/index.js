import React, { useState, useEffect } from 'react';
import "./calculator.css"

const Calculator = () => {
    const [current, setCurrent] = useState([])
    const [next, setNext] = useState([])
    const [result, setResult] = useState(0)
    const [operator, setOperator] = useState(null)
    const [allData, setAllData] = useState([])
    const [activeOperation, setActiveOperation] = useState(null)

    const handleInput = e => {
        const val = e.target.innerText
        activeOperation ?
            setNext(input => [...input, val]) :
            setCurrent(input => [...input, val])
    }

    const handleOperation = () => {
        // setActiveOperation(true)
    }

    const evaluate = e => {
        console.log("Evaluate");
    }

    useEffect(() => {
        if (operator) {
            console.log(operator);
            if (next.length) {
                switch (operator) {
                    case "/":
                        return setResult(parseFloat(current.join("")) / parseFloat(next.join("")))
                    case "x":
                        return setResult(parseFloat(current.join("")) * parseFloat(next.join("")))
                    case "-":
                        return setResult(parseFloat(current.join("")) - parseFloat(next.join("")))
                    case "+":
                        return setResult(parseFloat(current.join("")) + parseFloat(next.join("")))
                    default:
                        break;
                }
            }
        }
    }, [operator, next]);

    return (
        <div className="main-wrapper">
            <div className="screen-group">
                <div className="input">{current}</div>
                <div className="result">{result}</div>
            </div>
            <div className="keypad-group">
                <div className="sub-button-group white">
                    <div
                        className="button white"
                        onClick={() => {
                            setCurrent([])
                            setResult(0)
                        }}
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
                    <div className="button white" onClick={handleOperation}>%</div>
                    <div className="button" onClick={handleInput}>9</div>
                    <div className="button" onClick={handleInput}>6</div>
                    <div className="button" onClick={handleInput}>3</div>
                    <div className="button white" onClick={handleInput}>.</div>
                </div>
                <div className="sub-button-group">
                    <div className="button operator" onClick={() => setOperator("/")}>/</div>
                    <div className="button operator" onClick={() => setOperator("x")}>x</div>
                    <div className="button operator" onClick={() => setOperator("-")}>-</div>
                    <div className="button operator" onClick={() => setOperator("+")}>+</div>
                    <div className="button operator" onClick={evaluate}>
                        <span className="round">=</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
