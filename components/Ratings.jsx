import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from "react-icons/fi"

const Rating = ({ id, index, size }) => {
    const fill = index <= id
    return (
        <FiStar
            style={{
                width: size,
                height: size,
                transition: `color ${0.2}s ease`,

                // Only fill from current id downwards
                // fill: fill ? "#f67280" : "none",
                // color: fill ? "#f67280" : "#6c5b7b",
            }}
            className={`text-blue-500 ${fill && "fill-current"}`}
        />
    )
}

const Ratings = ({ size, selected }) => {
    const [id, setID] = useState(selected || 1)
    const [stars, setStars] = useState([])
    const count = 5

    useEffect(() => {
        // populate stars
        populate()

        function populate() {
            const elems = []
            for (let i = 0; i < count; i++) {
                elems.push({
                    id: i + 1,
                    icon: <Rating id={id} index={i + 1} size={size} />
                })
            }
            setStars(elems)
        }

    }, [id, count, size]);

    return (
        <div className="px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="text-center text-gray-400 space-y-2">
                <div className="space-y-1 text-sm">
                    <p>You left the meeting</p>
                    <p className="text-white">Please rate the quality of your last call</p>
                </div>
                <div className="flex py-2 space-x-2 items-center justify-between">
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
                <p className="flex justify-between text-sm">
                    <span className={`${id <= 2 && "text-white"}`}>Not good</span>
                    <span className={`${id >= count - 1 && "text-white animate-pulse"}`}>Very good</span>
                </p>
            </div>
        </div>
    )
}

export default Ratings;
