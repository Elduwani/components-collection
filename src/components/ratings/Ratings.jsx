import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from "react-icons/fi"
import "./ratings.scss"

const Rating = ({ id, index, size }) => {
    return (
        <FiStar
            style={{
                width: size,
                height: size,
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
    const [stars, setStars] = useState([])
    const count = number || 5


    useEffect(() => {
        // populate stars
        (() => {
            const elems = []
            for (let i = 0; i < count; i++) {
                elems.push({
                    id: i + 1,
                    icon: <Rating id={id} index={i + 1} size={size} />
                })
            }
            setStars(elems)
        })()
    }, [id, count, size]);

    return (
        <div className="stars-wrapper">
            <div className="container">
                <h2>You left the meeting</h2>
                <p>Please rate the quality of your last call</p>
                <div className="stars">
                    {
                        stars.map(rating =>
                            <motion.div
                                key={rating.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setID(rating.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >{rating.icon}</motion.div>
                        )
                    }
                </div>
                <div className="flex">
                    <p>Not good</p>
                    <p style={{ textAlign: "right" }}>Very good</p>
                </div>
            </div>
        </div>
    )
}

export default Ratings;
