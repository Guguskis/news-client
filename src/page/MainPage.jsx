import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient';
import Box from '@mui/material/Box';
import NewsCard from '../components/NewsCard.jsx';
import Typography from '@material-ui/core/Typography';

const MainPage = () => {
    const [news] = useNewsClient();

    // add auto scroll to bottom for Box
    const boxRef = useRef(null);
    useEffect(() => {
        boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }, [news]);

    function assembleNewsCard(news, i) {
        return (
            <NewsCard news={news} key={i} />
        )
    }

    return (
        // todo Box sticky scroll bottom
        <Box ref={boxRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
        }}>
            {/* random picture */}
            {/* <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Typography variant="h4" component="div">
                    News
                </Typography>
            </Box> */}

            {news.map(assembleNewsCard)}
        </Box>
    );

}

export default MainPage;