import { LinearProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuBarContainer from "../components/MenuBarContainer.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { useNewsClient } from "../hooks/useNewsClient.jsx";
import useScrollableComponent from "../hooks/useScrollableComponent.jsx";
import { useScrollStopwatch } from "../hooks/useScrollStopwatch.jsx";

const MainPage = () => {
  const {
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
  } = useNewsClient();

  const state = useSelector((state) => state.news);

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
    if (!loading && !scrolledRecently) {
      scroll();
      console.log("news");
      console.log(state.news);
    }
  }, [news]);

  return (
    <MenuBarContainer>
      <ScrollTargetComponent />
      {news.map((news) => (
        <NewsCard sx={{ mb: 1 }} news={news} key={news.id} />
      ))}
      <LinearProgress sx={{ visibility: loading ? "visible" : "hidden" }} />
    </MenuBarContainer>
  );
};

export default MainPage;
