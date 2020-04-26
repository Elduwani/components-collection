import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from "react-icons/fi"

const Rating = ({ id, index, size }) => {
    return (
        <FiStar
            style={{
                width: size,
                height: size,
                marginRight: 15,
                transition: `color ${0.2}s ease`,

                // Only fill from current id downwards
                fill: index <= id ? "#f67280" : "none",
                color: index <= id ? "#f67280" : "#6c5b7b",
            }}
        />
    )
}

const Ratings = ({ number, size, selected }) => {
    const [id, setID] = useState(selected || 1)
    const count = number || 5
    const elements = []

    for (let i = 0; i < count; i++) {
        elements.push({
            id: i + 1,
            icon: <Rating id={id} index={i + 1} size={size} />
        })
    }

    return (
        <div className="flex">
            {
                elements.map(rating => {
                    return (
                        <motion.div
                            key={rating.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setID(rating.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >{rating.icon}</motion.div>
                    )
                })
            }
        </div>
    )
}

export default Ratings;
