import { Container, LinearProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import NewsCard from "../components/NewsCard.jsx";
import { useNewsClient } from "../hooks/useNewsClient.jsx";
import useScrollableComponent from "../hooks/useScrollableComponent.jsx";
import { useScrollStopwatch } from "../hooks/useScrollStopwatch.jsx";
import RedditSubscriptionForm from "./../components/RedditSubscriptionForm.jsx";

const MainPage = () => {
  const {
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
  } = useNewsClient();

  const [scroll, ScrollTargetComponent] = useScrollableComponent();
  const { scrolledRecently } = useScrollStopwatch({ seconds: 2 });

  const handleScroll = useCallback(
    (e) => {
      const target = e.target.scrollingElement;
      const offset = target.scrollHeight - target.scrollTop;
      const bottom = offset - target.clientHeight < 100;

      if (bottom) {
        loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!loading && !scrolledRecently) scroll();
  }, [news]);

  return (
    <Container>
      <ScrollTargetComponent />
      <RedditSubscriptionForm
        subscribeSubreddits={subscribeSubreddits}
        unsubscribeSubreddits={unsubscribeSubreddits}
      />
      {news.map((news) => (
        <NewsCard sx={{ mb: 1 }} news={news} key={news.id} />
      ))}
      <LinearProgress sx={{ visibility: loading ? "visible" : "hidden" }} />
    </Container>
  );
};

export default MainPage;
