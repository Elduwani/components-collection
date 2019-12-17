import { useEffect, useRef } from 'react';

function useInterval(callback, delay, paused, setPaused) {
    const savedCallback = useRef()

    //remember the latest callback
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let counter1 = setInterval(tick, delay)
            if (paused) {
                //reset counter && paused
                clearInterval(counter1)
                counter1 = setInterval(tick, delay)
                setPaused(false)
            }
            return () => clearInterval(counter1)
        }
        //eslint-disable-next-line
    }, [delay, paused])
}

export default useInterval;
