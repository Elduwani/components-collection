import { useEffect, useRef } from 'react';

function useInterval(callback, delay, id) {
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
            return () => clearInterval(counter1)
        }
        //eslint-disable-next-line
    }, [delay, id])
}

export default useInterval;
