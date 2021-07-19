import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion"
import { FiSun } from "react-icons/fi"

const BrightnessController = () => {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const [end, setEnd] = useState(200)

    const rotate = useTransform(x, [0, end], [0, 360])
    const background = useTransform(x, [0, end], ["#35477d", "#e6d3a7"])
    const iconColor = useTransform(x, [0, end], ["#fff", "#35477d"])

    useEffect(() => {
        const width = ref.current.offsetWidth
        width && setEnd(width)
    }, [])

    return (
        <motion.div className="p-6 rounded-lg" style={{ background }}>
            <div className="flex items-center justify-center space-x-4">
                <div>
                    <motion.div
                        className="grid place-items-center"
                        style={{
                            rotate, //animated...
                            color: iconColor
                        }}>
                        <FiSun className="text-2xl" />
                    </motion.div>
                </div>
                <div className="h-1.5 bg-red-400 w-full rounded flex items-center" ref={ref}>
                    <motion.div
                        // Dragable circle
                        drag="x"
                        dragElastic={0}
                        dragConstraints={ref}
                        style={{ x, background: iconColor }}
                        className="w-5 h-5 bg-blue-600 rounded-full cursor-pointer"
                    ></motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default BrightnessController;
