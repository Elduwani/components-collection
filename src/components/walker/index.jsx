import { useState, useEffect } from 'react'
import { transform } from "framer-motion"
import useInterval from "../../functions/useInterval"
import { GiChessKnight as KnightIcon } from "react-icons/gi"
import "./walker.scss"

const grid = (num) => Array(num).fill(true).map((_, i) => {
    const rowName = String.fromCharCode(97 + i)
    return Array(num).fill(rowName).map((_, j) => rowName + (num - j))
})

export default function Walker() {
    //8x8 grid
    const [board] = useState(grid(8))
    const [selectedSquare, setSelectedSquare] = useState("d4")
    const [visitedSquares, setVisitedSquares] = useState([])
    const [legalSquares, setLegalSquares] = useState([])

    function walk() {
        const randomCellIndex = () => Math.floor(Math.random() * legalSquares.length)
        let randomIndex = randomCellIndex()

        for (let i = 0; i < 2; i++) {
            if (visitedSquares.includes(randomIndex)) {
                i = i - 1
                randomIndex = randomCellIndex()
                continue
            } else break
        }
        // console.log(legalSquares)
        setSelectedSquare(legalSquares[randomIndex])
    }

    useInterval(() => walk(), 2000, selectedSquare)

    useEffect(() => {
        const legalMoves = getLegalSquares(selectedSquare, board)
        setVisitedSquares(st => [...st, selectedSquare])
        setLegalSquares(legalMoves)
    }, [selectedSquare, board]);

    return (
        <div className="pages" style={{ display: "block" }}>
            <div className="board-wrapper">
                {
                    board.map((row, i) => {
                        const even = i % 2 === 0

                        return <div
                            key={i}
                            className="row"
                        >
                            {
                                row.map((cell, j) => {
                                    const index = row.length - j
                                    const cellAlphabet = String.fromCharCode(i + 97)
                                    const isSelected = cell === selectedSquare
                                    const isLegal = legalSquares.includes(cell)
                                    const bgColor = j % 2 === 0 ?
                                        (even ? "white" : "black") :
                                        (even ? "black" : "white");

                                    return <div
                                        key={index}
                                        className={`cell ${bgColor} ${isLegal && "legal"}`}
                                        onClick={() => setSelectedSquare(cell)}
                                    >
                                        {
                                            i === 0 &&
                                            <span className="row-number">{cell[1]}</span>
                                        }
                                        {
                                            j === 7 &&
                                            <span className="row-letter">{cellAlphabet}</span>
                                        }
                                        {
                                            isSelected &&
                                            <span className="horsy">{<KnightIcon />}</span>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
            <div style={{ color: "white", marginTop: 40, padding: 20 }}>{legalSquares.join(" --- ")}</div>
        </div>
    )
}

function getLegalSquares(square = "a1", board = []) {
    if (square) {
        // const squares = []
        const rowLetter = square[0]
        const rowIndex = charToNum(rowLetter, board.length)
        const cellIndex = Number(square[1]) //invert for accurate calculations in loops => board.length - Number(sqaure[1])
        // const maxDistance = 2

        function indexToChar(num) {
            return String.fromCharCode(num + 97 - 1)
        }

        function charToNum(char, max = 8) {
            return Math.round(transform(char.toLowerCase().charCodeAt(0), [97, 97 + max - 1], [1, max]))
        }

        /**
         * The farthest legal moves for a knight are 2 squares away from its current position
         * Initialize i to skip illegal rows and j to skip illegal cell. This is done by:
         * A > [rows]: start at 2 rows before or beginning of board (minimum fallback), end at two rows after or end of board (maximum fallback)
         * B > [cells]: start at 2 cells before or beginning of row (minimum fallback), end at two cells after or end of row (maximum fallback)
         * 
        */

        const squares = [
            indexToChar(rowIndex - 2) + (cellIndex - 1),
            indexToChar(rowIndex - 2) + (cellIndex + 1),
            indexToChar(rowIndex - 1) + (cellIndex - 2),
            indexToChar(rowIndex - 1) + (cellIndex + 2),
            indexToChar(rowIndex + 1) + (cellIndex - 2),
            indexToChar(rowIndex + 1) + (cellIndex + 2),
            indexToChar(rowIndex + 2) + (cellIndex - 1),
            indexToChar(rowIndex + 2) + (cellIndex + 1),
        ]
        //only return a string of length 2 that's in the range of "a...h + 1...8"
        const filtered = squares.filter(sq => sq[0].match(/[A-Ha-h]/) && sq[1].match(/[1-8]/) && !sq[2])
        return filtered

        /* 
            for (
                let i = Math.max(0, rowIndex - maxDistance - 1);
                i < Math.min(rowIndex + maxDistance, board.length);
                i++
            ) {

                if (rowIndex - 1 === i) continue
                const row = board[i];

                for (
                    let j = Math.max(0, cellIndex - maxDistance);
                    j < Math.min(cellIndex + maxDistance + 1, row.length);
                    j++
                ) {

                    if (cellIndex === j) continue
                    const cell = board[i][j];
                    console.log(i, j)
                    squares.push(cell)

                }
            }
        */
    }

    return []
}