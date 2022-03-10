import { useState, useEffect } from 'react';

import { useSubscription } from "react-stomp-hooks";
import { ArraysState } from '../utils/utils.jsx';

import { API } from '../config/axiosConfig.jsx';

export function useNewsClient() {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [{ data: getNewsData, loading: getNewsLoading, error: getNewsError }, getNewsExecute] = API.useNewsApi({
    url: "/api/news",
    method: "GET"
  })

  useSubscription("/topic/news", (message) => setMessage(message.body));

  useEffect(() => {
    if (!getNewsLoading && getNewsData) {
      let fetchedNews = getNewsData.news.map(assembleNews)

      fetchedNews.sort((a, b) => a.created - b.created);

      setNews(fetchedNews)
    }
  }, [getNewsLoading, getNewsData]);

  useEffect(() => {
    if (message === "")
      return;

    try {
      const newsItem = assembleNews(JSON.parse(message));
      ArraysState.add(setNews, newsItem);
      console.debug(newsItem);

    } catch (error) {
      console.warn("Can't parse message: " + message, error)
    }
  }, [message]);

  function loadMore() {
    console.log("load more");
  }

  function assembleNews(news) {
    news.created = new Date(news.created);
    return news
  }


  return { news, loadMore };
  // return [news, subscribeChannel, unsubscribeChannel];
}