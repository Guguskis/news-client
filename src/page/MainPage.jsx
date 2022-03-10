import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient.jsx';
import { Box, Container } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const MainPage = () => {
    const { news, loadMore } = useNewsClient();

    const scrollTargetRef = useRef(null);
    const containerRef = useRef(null);
    useEffect(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [news]);

    useScrollPosition(({ prevPos, currPos }) => {
        if (currPos.y === 0) {
            loadMore()
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
        </Container>
    );

}

export default MainPage;