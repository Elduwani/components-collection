import React, { useState } from 'react';
import { FiStar } from "react-icons/fi"

const Rating = () => {
    const [fill, setFill] = useState(false)
    return (
        <FiStar
            style={{ width: 25, height: 25, fill: fill ? "#f8efdb" : "none", color: "#f8efdb", marginRight: 15 }}
            onClick={() => setFill(!fill)}
        />
    )
}

const Ratings = ({ number }) => {
    const times = number || 5
    const elements = []

    for (let i = 0; i < times; i++) {
        elements.push(<Rating />)
    }

    return (
        <div className="flex">
            {
                elements.map((rating, index) => {
                    return <div key={index} style={{ cursor: 'pointer' }}>{rating}</div>
                })
            }
        </div>
    )
}

export default Ratings;
