import { useState } from 'react'
import { motion } from "framer-motion"
import blueprint from "./layoutBlueprint";

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
                    className={`
                        ${useMotion && "rounded-md"} 
                        ${selected ? `bg-blue-400 ${useMotion && "animate-pulse"}` : `bg-gray-800 ${useMotion && "border border-gray-700"}`}
                    `}
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
            style={{ gridAutoRows: useMotion ? "" : 25 }}
            className={`
                grid grid-cols-3 border rounded h-full overflow-hidden
                ${useMotion ? "gap-3 p-3 border-gray-700 hover:opacity-70"
                    : `gap-1 cursor-pointer ${index === id ? "border-blue-500" : "border-gray-700"}`}
            `}
        >{children}</motion.div>
    }

    return (
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 p-4 border border-gray-700 rounded-lg">
            <div className="flex flex-col space-y-4">
                <h3>Select a template</h3>
                <div className="grid grid-cols-3 gap-2">
                    {blueprint.map(node => generateGrid(node))}
                </div>
            </div>
            <div className="md:col-span-2 h-96">
                {generateGrid(blueprint[index], true)}
            </div>
        </div>
    )
}
