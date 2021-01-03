import { useState } from 'react'
import "./walker.scss"

export default function Walker() {
    const [selectedSquare, setSelectedSquare] = useState("c6")
    const [visitedSquares, setVisitedSquares] = useState([])
    //8x8 grid
    const board = Array(8).fill(true).map(() => Array(8).fill(true).map(() => true))

    return (
        <div className="pages">
            <div className="board-wrapper">
                {
                    board.map((row, i) => {
                        const even = i % 2 === 0

                        return <div
                            key={i}
                            className="row"
                        >
                            {
                                row.map((_, j) => {
                                    const index = row.length - j
                                    const cellAlphabet = String.fromCharCode(i + 97)
                                    const isSelected = cellAlphabet + index === selectedSquare
                                    const bgcolor = j % 2 === 0 ?
                                        (even ? "white" : "gray") :
                                        (even ? "gray" : "white");

                                    return <div
                                        key={index}
                                        className="cell"
                                        style={{ backgroundColor: isSelected ? "red" : bgcolor }}
                                    >
                                        {
                                            i === 0 &&
                                            <span className="row-number">{index}</span>
                                        }
                                        {
                                            j === 7 &&
                                            <span className="row-letter">{cellAlphabet}</span>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}
