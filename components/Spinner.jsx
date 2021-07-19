import { motion } from "framer-motion";
import { CgSpinnerAlt } from "react-icons/cg";
import { ImSpinner3 } from "react-icons/im";

export default function Spinner({ variant, color, size }) {
    const styles = `animate-spin ${size ?? "text-3xl"} ${color ?? "text-white"}`
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: .3 }}
        >
            {
                variant === 2 ?
                    <ImSpinner3 className={styles} />
                    : <CgSpinnerAlt className={styles} />
            }
        </motion.div>
    );
}