//Kód podľa: https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b


import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { secondsToNormal } from '../utils/TimeFormate'

const INTERVAL_IN_MILISECONDS = 100;


function Timer({ numSec }) {
    const [time, setTime] = useState(numSec * 1000);
    const referenceTime = useRef(Date.now());
    // smer odpočítavania
    const [countDown, setCountDown] = useState(true);

    useEffect(() => {
        setTime((numSec >= 0) ? numSec*1000 : -1*numSec * 1000);
        referenceTime.current = Date.now();
        if (numSec < 0) {
            setCountDown(false);
        }
    }, [numSec]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - referenceTime.current;
            referenceTime.current = now;

            setTime(prevTime => {

                if (prevTime <= 0) {
                    setCountDown(false);
                    return prevTime + diff;
                }

                // 10 -> 9 -> 8....
                if (countDown) {
                    return prevTime - diff;
                }
                // 1 -> 2 -> 3
                else {
                    return prevTime + diff;
                }
            });
        }, INTERVAL_IN_MILISECONDS); 

        return () => clearInterval(interval);
    }, [countDown]);

let answer = secondsToNormal((time / 1000).toFixed(0), countDown);

return <>
    {
        answer
    }
</>;
}

export default Timer