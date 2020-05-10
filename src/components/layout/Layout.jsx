import React, { useState } from 'react'
import { motion } from "framer-motion"
import blueprint from "./layoutBlueprint";
import "./layout.scss"

export default function Layout() {
    const [index, setIndex] = useState(0)

    const container = {
        hidden: { opacity: 0.8, y: -5 },
        visible: {
            opacity: 1, y: 0,
            transition: { when: "beforeChildren", staggerChildren: 0.05 }
        }
    }

    const item = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    function generateGrid(object, useMotion) {
        const { id, gridRow, gridColumn } = object
        const children = []

        for (let i = 0; i < 6; i++) {
            const selected = i === 0
            children.push(
                <motion.div
                    key={i}
                    variants={useMotion ? item : {}}
                    className={`grid-child ${selected ? "selected" : ""}`}
                    style={{
                        gridColumn: selected ? gridColumn : "",
                        gridRow: selected ? gridRow : "",
                    }}></motion.div>
            )
        }
        return <motion.div
            key={id}
            variants={useMotion ? container : {}}
            initial="hidden"
            animate="visible"
            onClick={() => setIndex(id)}
            className={`grid-parent ${index === id ? "active" : ""}`}
        >{children}</motion.div>
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
                {generateGrid(blueprint[index], true)}
            </div>
        </div>
    )
}
