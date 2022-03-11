import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNewsClient } from '../hooks/useNewsClient.jsx';
import { Box, Container, Typography } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useTimer } from 'react-timer-hook';
import { Time } from "../utils/utils.jsx";
import { useScrollStopwatch } from './../hooks/useScrollStopwatch.jsx';
import useWindowDimensions from 'use-window-dimensions';
import useScrollableComponent from '../hooks/useScrollableComponent.jsx';

const MainPage = () => {
    const { news, loading, loadMore } = useNewsClient();

    const { scroll, ScrollTargetComponent } = useScrollableComponent();

    useEffect(() => {
        scroll();
    }, [news]);

    useScrollPosition(({ currPos }) => {
        if (currPos.y === 0) {
            loadMore();
        }
    })

    const { scrolledRecently } = useScrollStopwatch(2)

    //// --------------------
    const handleScroll = useCallback((e) => {
        const target = e.target.scrollingElement;
        const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;

        if (bottom)
            loadMore();
    }, [loadMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    //// --------------------

    return (
        <>
            <ScrollTargetComponent />
            <Typography variant="h4" component="h1" gutterBottom>
                {scrolledRecently ? "scrolled recently" : "not scrolled recently"}
            </Typography>
            <Container
                maxWidth="lg"
                spacing={30}
            // flex column inverse
            // display="flex"
            // direction="column-reverse"
            >
                {news.map((news, i) =>
                    <NewsCard
                        sx={{ mb: 1 }}
                        news={news}
                        key={i}
                    />
                )}
            </Container>
        </>
    );

}

export default MainPage;