import React from 'react';
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

const Loader = ({ size, stroke, color, duration }) => {
    return (
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
            animate={{ rotate: 360 }}
            transition={{ type: 'tween', duration: duration || 1, ease: 'linear', loop: Infinity }}
        >
            <LoaderElement size={size} stroke={stroke} color={color} />
        </motion.div>
    );
}

export default Loader;
