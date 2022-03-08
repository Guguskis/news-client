import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient';
import { Box, Container } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';

const MainPage = () => {
    const [news] = useNewsClient();

    const scrollTargetRef = useRef(null);
    useEffect(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [news]);

    return (
        // Container With spacing between items
        <Container maxWidth="lg" spacing={30}>
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