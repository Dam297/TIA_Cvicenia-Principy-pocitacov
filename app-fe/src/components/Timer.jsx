//Kód podľa: https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b


import { useState } from 'react'
import { useEffect } from 'react'
import {secondsToNormal} from '../utils/TimeFormate'

const INTERVAL_IN_MILISECONDS = 1000;


function Timer (numSec) {
    const [time, setTime] = useState(numSec*1000);
    const [referenceTime, setReferenceTime] = useState(Date.now());
    // smer odpočítavania
    const [countDown, setCountDown] = useState(true);


    useEffect(() => {
        const count = () => {
            setTime(prevTime => {
                const now = Date.now();
                const interval = now - referenceTime;
                setReferenceTime(now);

                if (prevTime <= 0){
                    setCountDown(false);
                    return prevTime + interval;
                }

                // 10 -> 9 -> 8....
                if(countDown){
                    return prevTime - interval;
                } 
                // 1 -> 2 -> 3
                else {
                    return prevTime + interval;
                }                
            });
        }

        setTimeout(count, INTERVAL_IN_MILISECONDS);
    }, [time]);


    let answer = secondsToNormal((time / 1000).toFixed(0), countDown);

    return <>
        {
           answer
        }
    </>;
}

export default Timer