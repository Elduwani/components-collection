import React, { useState } from 'react'
import blueprint from "./layoutBlueprint";
import "./layout.scss"

export default function Layout() {
    const [index, setIndex] = useState(0)

    function generateGrid(object) {
        const { id, gridRow, gridColumn } = object
        const children = []

        for (let i = 0; i < 6; i++) {
            const selected = i === 0
            children.push(
                <div key={i}
                    className={`grid-child ${selected ? "selected" : ""}`}
                    style={{
                        gridColumn: selected ? gridColumn : "",
                        gridRow: selected ? gridRow : "",
                    }}></div>
            )
        }
        return <div
            key={id}
            onClick={() => setIndex(id)}
            className={`grid-parent ${index === id ? "active" : ""}`}
        >{children}</div>
    }

    return (
        <div className="layouts-wrapper">
            <div className="left-section">
                <h3>Select a template</h3>
                <div className="thumbnails">
                    {blueprint.map(node => generateGrid(node))}
                </div>
            </div>
            <div className="right-section">
                {generateGrid(blueprint[index])}
            </div>
        </div>
    )
}
