//Kód podľa: https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b


import { useState } from 'react'
import { useEffect } from 'react'

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

    let seconds = (time / 1000).toFixed(0);
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hours * 3600) / 60);
    let secondsLeft = seconds - hours * 3600 - mins * 60;

    var answer = (countDown ? "" : "-");
    answer += (hours < 10 ? "0" + hours : hours);
    answer += ":" + (mins < 10 ? "0" + mins : mins);
    answer += ":" + (secondsLeft < 10 ? "0" + secondsLeft : secondsLeft);


    return <>
        {
            answer
        }
    </>;
}

export default Timer