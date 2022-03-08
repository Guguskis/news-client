import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';


const NewsCard = (props) => {

    return (
        <Card >
        {/* <Card sx={{ minWidth: 275 }} > */}
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.news.title}
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

export default NewsCard;
