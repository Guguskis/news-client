import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNewsClient } from '../hooks/useNewsClient.jsx';
import { Box, Container, Typography } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import { useScrollStopwatch } from './../hooks/useScrollStopwatch.jsx';
import useScrollableComponent from '../hooks/useScrollableComponent.jsx';

const MainPage = () => {
    const { news, loading, loadMoreRef } = useNewsClient();

    const [scroll, ScrollTargetComponent] = useScrollableComponent();
    const { scrolledRecently } = useScrollStopwatch({ seconds: 2 })

    //// --------------------
    const handleScroll = (e) => {

        const target = e.target.scrollingElement;
        const offset = target.scrollHeight - target.scrollTop;
        const bottom = (offset - target.clientHeight) < 100;

        if (bottom) {
            loadMoreRef.current();
        }
    }

    useEffect(() => {
        if (!loading && !scrolledRecently)
            scroll();
    }, [loading, news]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    //// --------------------

    return (
        <>
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
            </Container>
        </>
    );

}

export default MainPage;