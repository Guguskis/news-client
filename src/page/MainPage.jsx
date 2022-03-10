import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNewsClient } from '../hooks/useNewsClient.jsx';
import { Box, Container, Typography } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useTimer } from 'react-timer-hook';
import { useStopwatch } from 'react-timer-hook';

function nowPlus2Seconds() {
    return new Date(Date.now() + 2000);
}

// const useScrollStopwatch = (expiryTimestamp) => {
//     const { isRunning, restart } = useTimer({ expiryTimestamp, autoStart: false });

//     useScrollPosition(() => {
//         restart(nowPlus2Seconds());
//     }, [restart]);

//     return { scrolledRecently: isRunning };
// }


const MainPage = () => {
    const { news, loading, loadMore } = useNewsClient();

    // const { scrolledRecently } = useScrollStopwatch(nowPlus2Seconds())

    const scrollTargetRef = useRef(null);
    const containerRef = useRef(null);

    // const scrollDown = useCallback(() => {
    //     if (!scrolledRecently)
    //         scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    // }, [scrolledRecently]);


    // useEffect(() => {
    //     scrollDown();
    // }, [news]);

    useScrollPosition(({ prevPos, currPos }) => {
        if (currPos.y === 0) {
            loadMore();
        }
    })

    return (
        <Container
            ref={containerRef}
            maxWidth="lg"
            spacing={30}
        >
            {news.map((news, i) =>
                <NewsCard
                    sx={{ mb: 1 }}
                    news={news}
                    key={i}
                />
            )}
            <Box ref={scrollTargetRef}></Box>
            {/* Typography isRunning */}
            <Typography variant="h4" component="h1" gutterBottom>
                {/* HELLO {scrolledRecently ? "scrolledRecently" : "not scrolledRecently"} */}
            </Typography>
        </Container>
    );

}

export default MainPage;