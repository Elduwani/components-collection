import { Board } from './Board'
import "./walker.scss"

export const grid = (num) => Array(num).fill(true).map((_, i) => {
    const rowName = String.fromCharCode(97 + i)
    return Array(num).fill(rowName).map((_, j) => rowName + (num - j))
})

export default function Walker() {
    return (
        <div className="pages board" style={{ display: "block" }}>
            <Board cols={8} />
            {/* <div style={{ width: 200, margin: "32px auto" }}>
                <button onClick={() => setKey(k => k + 1)}>Restart</button>
            </div> */}
        </div>
    )
}