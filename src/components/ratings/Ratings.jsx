import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from "react-icons/fi"

const Rating = ({ id, index }) => {
    return (
        <FiStar
            style={{
                width: 25,
                height: 25,
                fill: index <= id ? "#f67280" : "none",
                color: index <= id ? "#f67280" : "#6c5b7b",
                marginRight: 15,
                transition: `color ${0.2}s ease`,
            }}
        />
    )
}

const Ratings = ({ number }) => {
    const [id, setID] = useState(0)
    const times = number || 5
    const elements = []

    for (let i = 0; i < times; i++) {
        elements.push({
            id: i + 1,
            icon: <Rating id={id} index={i + 1} />
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
