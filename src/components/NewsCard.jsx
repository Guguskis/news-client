import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { IconButton } from '@mui/material';

const NewsCard = (props) => {

    return (
        <Card >
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
                {/* IconButton to open news.url in new tab*/}
                <IconButton href={props.news.url} 
                    target="_blank"
                >
                    <LinkIcon />
                </IconButton>

                
            </CardActions>
        </Card>
    )
}

export default NewsCard;
