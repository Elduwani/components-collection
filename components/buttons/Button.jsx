import { motion } from "framer-motion";

export default function Button({ children, onClick, bg = "bg-gray-700", isLoading }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'tween' }}
            onClick={onClick}
            className={`
                w-full px-6 max-w-md outline-none py-0 h-12 rounded-lg flex items-center justify-center hover:opacity-90
                space-x-3 text-base whitespace-nowrap focus:outline-none disabled:opacity-60
                ${bg} ${isLoading && "bg-opacity-30"}
            `}
        >{children}</motion.button>
    )
}