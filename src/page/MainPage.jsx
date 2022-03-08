import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient';
import { Box, Container } from '@mui/material';
import NewsCard from '../components/NewsCard.jsx';
import Typography from '@material-ui/core/Typography';

const MainPage = () => {
    const [news] = useNewsClient();

    // add auto scroll to bottom for Box
    const containerRef = useRef(null);
    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [news]);

    function assembleNewsCard(news, i) {
        return (
            <NewsCard news={news} key={i} />
        )
    }

    return (
        // todo Box sticky scroll bottom
        <Container ref={containerRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
        }}>
            {news.map(assembleNewsCard)}
        </Container>
    );

}

export default MainPage;