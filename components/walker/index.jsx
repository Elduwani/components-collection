import { useState, useEffect, useRef } from 'react';
import { transform } from "framer-motion";
import useInterval from "../../functions/useInterval";
import { GiChessKnight as KnightIcon } from "react-icons/gi";
// import "./walker.scss"

const grid = (num) => Array(num).fill(true).map((_, i) => {
    const rowName = String.fromCharCode(97 + i)
    return Array(num).fill(rowName).map((_, j) => rowName + (num - j))
})

export default function Board() {
    const ref = useRef()
    const [board] = useState(grid(8)) //8*8 grid;
    const [dimension, setDimension] = useState(undefined)
    const [selectedSquare, setSelectedSquare] = useState();
    const [visitedSquares, setVisitedSquares] = useState([]);
    const [legalSquares, setLegalSquares] = useState([]);
    const [highScore, setHighScore] = useState(0);
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

    function startGame(e) {
        if (!selectedSquare || gameOver) {
            const { name } = e.target.dataset
            setScore(0)
            setVisitedSquares([])
            setSelectedSquare(name)
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
        <div ref={ref} className="flex flex-col items-center min-w-[340px]">
            <div className="scores">
                <p>Moves: <span>{score}</span> Highest score: <span>{highScore}</span></p>
            </div>
            <div
                style={{ width: dimension, height: dimension }}
                className="board-wrapper"
            >
                {board.map((row, i) => {
                    const even = i % 2 === 0;

                    return <div key={i} className="row">
                        {
                            row.map((cell, j) => {
                                const index = row.length - j;
                                const cellAlphabet = String.fromCharCode(i + 97);
                                const isSelected = cell === selectedSquare;
                                const isLegal = legalSquares.includes(cell);
                                const isVisited = visitedSquares.includes(cell);
                                const bgColor = j % 2 === 0 ?
                                    (even ? "white" : "black") :
                                    (even ? "black" : "white");

                                return <div
                                    key={index}
                                    data-name={cell}
                                    className={`cell ${bgColor} ${isLegal && "legal"} ${isVisited && "visited"}`}
                                    onClick={startGame}
                                >
                                    {i === 0 &&
                                        <span className="row-number">{cell[1]}</span>}
                                    {j === 7 &&
                                        <span className="row-letter">{cellAlphabet}</span>}
                                    {isSelected &&
                                        <span className="horsy">{<KnightIcon />}</span>}
                                </div>;
                            })
                        }
                    </div>;
                })}
            </div>
            {/* <div style={{ color: "white", marginTop: 40, padding: 20 }}>{legalSquares.join(" --- ")}</div> */}

            {
                !selectedSquare || gameOver ?
                    <div className="scores"><p>Tap a cell to start.</p></div> : null
            }
        </div>
    );
}

function getLegalSquares(square = "a1", board = [], visited = []) {
    if (square) {
        // const squares = []
        const rowLetter = square[0];
        const rowIndex = charToNum(rowLetter, board.length);
        const cellIndex = Number(square[1]); //invert for accurate calculations in loops => board.length - Number(sqaure[1])


        // const maxDistance = 2
        function indexToChar(num) {
            return String.fromCharCode(num + 97 - 1);
        }

        function charToNum(char, max = 8) {
            return Math.round(transform(char.toLowerCase().charCodeAt(0), [97, 97 + max - 1], [1, max]));
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
        ];
        //only return a string of length 2 that's in the range of "a...h + 1...8"
        const sanitized = squares.filter(sq => sq[0].match(/[A-Ha-h]/) &&
            sq[1].match(/[1-8]/) &&
            !sq[2] &&
            !visited.includes(sq)
        );
        return sanitized;

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

    return [];
}
