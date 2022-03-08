import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { IconButton } from '@mui/material';
import ReactTimeAgo from 'react-time-ago'

const NewsCard = ({ news, sx }) => {

    return (
        <Card sx={sx}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {news.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <ReactTimeAgo date={news.created} locale="en-US" />
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    href={news.url}
                    target="_blank"
                >
                    <LinkIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default NewsCard;
