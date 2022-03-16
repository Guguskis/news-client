import React, { useCallback, useEffect } from 'react'
import { useNewsClient } from '../hooks/useNewsClient.jsx'
import { Box, Container, LinearProgress, Button } from '@mui/material'
import NewsCard from '../components/NewsCard.jsx'
import { useScrollStopwatch } from '../hooks/useScrollStopwatch.jsx'
import useScrollableComponent from '../hooks/useScrollableComponent.jsx'

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
                <Container sx={{ mb: 1 }}>
                    <Button variant='contained' sx={{ mr: 1 }} onClick={() => subscribeSubreddits(['reactjs', 'javascript'])}>Subscribe</Button>
                    <Button variant='contained' onClick={() => unsubscribeSubreddits(['reactjs', 'javascript'])}>Unsubscribe</Button>
                </Container>
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