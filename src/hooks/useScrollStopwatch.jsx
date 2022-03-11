import { useRef, useEffect} from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useTimer } from 'react-timer-hook';
import { Time } from "../utils/utils.jsx";

export function useScrollStopwatch({ seconds }) {

    const scrolledRecentlyRef = useRef(false);

    const { isRunning, restart } = useTimer({
        expiryTimestamp: Time.nowPlusSeconds(seconds),
        autoStart: false
    });

    useScrollPosition(() => {
        restart(Time.nowPlusSeconds(seconds));
        scrolledRecentlyRef.current = true;
    }, [restart]);

    useEffect(() => {
        scrolledRecentlyRef.current = isRunning;
    }, [isRunning]);

    return { scrolledRecentlyRef };
}