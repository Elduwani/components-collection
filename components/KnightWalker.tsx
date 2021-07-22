import React, { useState, useEffect, useRef } from 'react';
import { motion, transform } from "framer-motion";
import useInterval from "../functions/useInterval";
import { GiChessKnight as KnightIcon } from "react-icons/gi";
// import "./walker.scss"

const grid = (num) => Array(num).fill(true).map((_, i) => {
    const rowName = String.fromCharCode(97 + i)
    return Array(num).fill(rowName).map((_, j) => rowName + (num - j))
})

export default function Board() {
    const ref = useRef(null)
    const [board] = useState(grid(8)) //8*8 grid;
    const [dimension, setDimension] = useState(undefined)
    const [selectedSquare, setSelectedSquare] = useState<string>();
    const [visitedSquares, setVisitedSquares] = useState([]);
    const [legalSquares, setLegalSquares] = useState([]);
    const [highScore, setHighScore] = useState<string | number>(0);
    const [score, setScore] = useState(0);

    const gameOver = selectedSquare && legalSquares.every(sq => visitedSquares.includes(sq)) && score > 1;

    function walk() {
        const randomCellIndex = () => Math.floor(Math.random() * legalSquares.length);
        let randomIndex = randomCellIndex();

        for (let i = 0; i < 2; i++) {
            if (visitedSquares.includes(randomIndex)) {
                i = i - 1;
                randomIndex = randomCellIndex();
                continue;
            }
            else break;
        }
        setScore(st => st + 1);
        setSelectedSquare(legalSquares[randomIndex]);
    }

    function startGame(e?: React.SyntheticEvent<HTMLElement>) {
        if (!selectedSquare || gameOver) {
            const { name } = e.currentTarget.dataset
            setScore(0)
            setVisitedSquares([])
            setSelectedSquare(name ?? "a1")
        }

        else console.log("Please wait, game in progress...")
    }

    useInterval(() => walk(), !selectedSquare || gameOver ? null : 1500, selectedSquare);

    useEffect(() => {
        function handleResize() {
            setDimension(Math.min(ref.current.offsetWidth, 550))
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    useEffect(() => {
        if (selectedSquare) {
            const legalMoves = getLegalSquares(selectedSquare, board, visitedSquares);
            if (legalMoves.length || !gameOver) {
                setVisitedSquares(st => [...st, selectedSquare]);
                setLegalSquares(legalMoves);
            }
        }
        //eslint-disable-next-line
    }, [selectedSquare, gameOver]);

    useEffect(() => {
        const lastScore = localStorage.getItem("walker_score") ?? 0
        if (gameOver && score > +lastScore) {
            setHighScore(score)
            localStorage.setItem("walker_score", String(score))
        } else setHighScore(lastScore)
    }, [gameOver, score]);

    useEffect(() => {
        fetch("/api/hello", { method: "GET" })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }, [])

    return (
        <div ref={ref} className="space-y-4 relative">
            <div style={{ width: dimension, height: dimension }} className={`grid grid-cols-8 rounded-lg overflow-hidden border border-gray-700`}>
                {
                    board.map((row, i) => {
                        const even = i % 2 === 0;

                        return <div key={i} className="grid grid-cols-1 grid-rows-8">
                            {
                                row.map((cell, j) => {
                                    const index = row.length - j;
                                    const cellAlphabet = String.fromCharCode(i + 97);
                                    const isSelected = cell === selectedSquare;
                                    const isLegal = legalSquares.includes(cell);
                                    const isVisited = visitedSquares.includes(cell);
                                    const bgColor = j % 2 === 0 ?
                                        (even ? "bg-gray-800" : "bg-blue-400") :
                                        (even ? "bg-blue-400" : "bg-gray-800");

                                    return <div
                                        key={index}
                                        data-name={cell}
                                        onClick={startGame}
                                        className={`flex-1 relative text-xs p-2 text-gray-400
                                            ${isVisited ? "bg-blue-600 ring-1 ring-blue-700" : bgColor} ${isLegal && "legal"} 
                                        `}
                                    >
                                        {i === 0 &&
                                            <span className="absolute left-2 top-2">{cell[1]}</span>}
                                        {j === 7 &&
                                            <span className="absolute right-2 bottom-2">{cellAlphabet}</span>}
                                        {isSelected &&
                                            <span className="absolute left-0 top-0 grid place-items-center h-full w-full text-white">{<KnightIcon className="w-4/5 h-4/5" />}</span>}
                                    </div>;
                                })
                            }
                        </div>;
                    })
                }
            </div>
            <div className="text-gray-400 flex justify-between items-center">
                <p>
                    Score: <span className="text-green-400 mr-2">{score}</span>
                </p>
                {
                    !selectedSquare || gameOver ?
                        <motion.p
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, type: "tween" }}
                            className="text-sm text-green-400"
                        >Tap a cell to start</motion.p>
                        : null
                }
                <p>Top score: <span className="text-green-300">{highScore}</span></p>
            </div>
        </div>
    );
}

function getLegalSquares(square = "a1", board = [], visited = []) {
    // const maxDistance = 2
    function indexToChar(num) {
        return String.fromCharCode(num + 97 - 1);
    }

    function charToNum(char, max = 8) {
        return Math.round(transform(char.toLowerCase().charCodeAt(0), [97, 97 + max - 1], [1, max]));
    }

    if (square) {
        // const squares = []
        const rowLetter = square[0];
        const rowIndex = charToNum(rowLetter, board.length);
        const cellIndex = Number(square[1]); //invert for accurate calculations in loops => board.length - Number(sqaure[1])
        /**
         * The farthest legal moves for a knight are 2 squares away from its current position
         * Initialize i to skip illegal rows and j to skip illegal cell. This is done by:
         * A > [rows]: start at 2 rows before or beginning of current position (minimum fallback), end at two rows after or end of current position (maximum fallback)
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
        ];
        //only return a string of length 2 that's in the range of "a...h + 1...8"
        const sanitized = squares.filter(sq => sq[0].match(/[A-Ha-h]/) &&
            sq[1].match(/[1-8]/) &&
            !sq[2] &&
            !visited.includes(sq)
        );
        return sanitized;
    }

    return [];
}
