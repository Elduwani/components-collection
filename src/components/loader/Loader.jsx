import React, { useState } from 'react';
import { motion } from 'framer-motion'
import styled from 'styled-components'

const LoaderElement = styled.div`
    width: 100%;
    height: 100%;
    border: ${props => props.stroke || 5}px solid transparent;
    border-top: ${props => props.stroke || 5}px solid ${props => props.color};
    border-radius: 999px;
    background: transparent;
`

const Loader = ({ size, stroke, color, duration, paused, pausable }) => {

    const [pause, setPause] = useState(paused)

    return (
        <div
            onClick={() => pausable && setPause(!pause)}
            style={{ cursor: 'pointer' }}
        >
            <motion.div
                style={{
                    width: size || 70,
                    height: size || 70,
                    marginRight: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 999,
                    background: 'transparent',
                }}
                animate={{ rotate: pause ? 0 : 360 }}
                transition={{ type: 'tween', duration: duration || 1, ease: 'linear', loop: pause ? null : Infinity }}
            >
                <LoaderElement size={size} stroke={stroke} color={color} />
            </motion.div>
        </div>
    );
}

export default Loader;
