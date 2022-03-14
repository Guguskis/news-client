import React, { useCallback, useEffect } from 'react'
import { useNewsClient } from '../hooks/useNewsClient.jsx'
import { Box, Container, LinearProgress } from '@mui/material'
import NewsCard from '../components/NewsCard.jsx'
import { useScrollStopwatch } from '../hooks/useScrollStopwatch'
import useScrollableComponent from '../hooks/useScrollableComponent.jsx'

const MainPage = () => {
    const { news, loading, loadMore } = useNewsClient()

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