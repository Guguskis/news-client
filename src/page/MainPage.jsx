import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNewsClient } from '../hooks/useNewsClient.jsx';
import { Box, Container, Typography, LinearProgress } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import { useScrollStopwatch } from './../hooks/useScrollStopwatch.jsx';
import useScrollableComponent from '../hooks/useScrollableComponent.jsx';

const MainPage = () => {
    const { news, loading, loadMoreRef } = useNewsClient();

    const [scroll, ScrollTargetComponent] = useScrollableComponent();
    const { scrolledRecently } = useScrollStopwatch({ seconds: 2 })

    //// --------------------
    const handleScroll = useCallback((e) => {

        const target = e.target.scrollingElement;
        const offset = target.scrollHeight - target.scrollTop;
        const bottom = (offset - target.clientHeight) < 100;

        if (bottom) {
            loadMoreRef.current();
        }
    } , [loadMoreRef]);

    useEffect(() => {
        if (!loading && !scrolledRecently)
            scroll();
    }, [news]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    //// --------------------

    return (
        <Box>
            <Container
                maxWidth="lg"
                spacing={30}
            >
                <ScrollTargetComponent />
                {news.map((news, i) =>
                    <NewsCard
                        sx={{ mb: 1 }}
                        news={news}
                        key={i}
                    />
                )}
                <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden' }} />
            </Container>
        </Box>
    );
}

export default MainPage;