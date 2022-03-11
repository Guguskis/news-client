import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useTimer } from 'react-timer-hook';
import { Time } from "../utils/utils.jsx";


export function useScrollStopwatch(expiresInSeconds) {
    const { isRunning, restart } = useTimer({ expiryTimestamp: Time.nowPlusSeconds(expiresInSeconds), autoStart: false });

    useScrollPosition(() => {
        restart(Time.nowPlusSeconds(expiresInSeconds));
    }, [restart]);

    return { scrolledRecently: isRunning };
}