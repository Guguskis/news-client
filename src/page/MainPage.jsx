import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient';
import { Box, Container } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import Typography from '@material-ui/core/Typography';

const MainPage = () => {
    const [news] = useNewsClient();

    const containerRef = useRef(null);
    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [news]);

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {news.map((news, i) => <NewsCard news={news} key={i} />)}
            <Box ref={containerRef}></Box>
        </Container>
    );

}

export default MainPage;