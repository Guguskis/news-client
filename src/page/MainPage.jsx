import React, { useCallback, useEffect } from 'react'
import { useNewsClient } from '../hooks/useNewsClient.jsx'
import { Box, Container, LinearProgress, Button, Grid, Typography, List, ListItem, IconButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material'
import NewsCard from '../components/NewsCard.jsx'
import { useScrollStopwatch } from '../hooks/useScrollStopwatch.jsx'
import useScrollableComponent from '../hooks/useScrollableComponent.jsx'
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

const MainPage = () => {
    const { news, loading, loadMore, subscribeSubreddits, unsubscribeSubreddits } = useNewsClient()

    const [scroll, ScrollTargetComponent] = useScrollableComponent()
    const { scrolledRecently } = useScrollStopwatch({ seconds: 2 })

    const handleScroll = useCallback((e) => {
        const target = e.target.scrollingElement
        const offset = target.scrollHeight - target.scrollTop
        const bottom = (offset - target.clientHeight) < 100

        if (bottom) {
            loadMore()
        }
    }, [loadMore])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    useEffect(() => {
        if (!loading && !scrolledRecently)
            scroll()
    }, [news])

    return (
        <Box>
            <Container
                maxWidth="lg"
                spacing={30}
            >
                <ScrollTargetComponent />
                <Grid item xs={12} md={6}>
                    <Container sx={{flexDirection: "row"}}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Avatar with text and icon
                        </Typography>
                        <Container sx={{ mb: 1 }}>
                            <Button variant='contained' sx={{ mr: 1 }} onClick={() => subscribeSubreddits(['lithuania', 'cryptoCurrency'])}>Subscribe</Button>
                            <Button variant='contained' onClick={() => unsubscribeSubreddits(['lithuania'])}>Unsubscribe</Button>
                        </Container>
                    </Container>
                    <List dense={true}>
                        {[1, 2, 3].map((value) => (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={true ? 'Secondary text' : null}
                                />
                            </ListItem>))
                        }
                    </List>
                </Grid>

                {news.map(news =>
                    <NewsCard
                        sx={{ mb: 1 }}
                        news={news}
                        key={news.id}
                    />,
                )}
                <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden' }} />
            </Container>
        </Box>
    )
}

export default MainPage