import React, { useRef, useEffect } from 'react';
import { useNewsClient } from '../hooks/useNewsClient';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';

const MainPage = () => {
    const [news] = useNewsClient();

    // add auto scroll to bottom for Box
    const boxRef = useRef(null);
    useEffect(() => {
        boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }, [news]);

    function NewsCard(news, i) {
        return (
            <Card sx={{ minWidth: 275 }} key={i} >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {news.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        )
    }

    return (
        // Box sticky scroll bottom



        <Box ref={boxRef} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}> */}
            {news.slice().reverse().map(NewsCard)}
        </Box>
    );

}

export default MainPage;