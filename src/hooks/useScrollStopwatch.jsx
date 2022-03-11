import { useEffect, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useTimer } from 'react-timer-hook';
import { Time } from "../utils/utils.jsx";

export function useScrollStopwatch({ seconds }) {

    const [scrolledRecently, setScrolledRecently] = useState(false);

    const { isRunning, restart } = useTimer({
        expiryTimestamp: Time.nowPlusSeconds(seconds),
        autoStart: false
    });

    useScrollPosition(() => {
        restart(Time.nowPlusSeconds(seconds));
        setScrolledRecently(true);
    }, [restart]);

    useEffect(() => {
        setScrolledRecently(isRunning);
    }, [isRunning]);

    return { scrolledRecently };
}