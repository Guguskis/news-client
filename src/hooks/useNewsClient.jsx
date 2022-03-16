import { useCallback, useEffect, useState } from 'react';

import { useSubscription, useStompClient } from "react-stomp-hooks";

import { API } from '../config/axiosConfig.jsx';

export function useNewsClient() {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [pageToken, setPageToken] = useState(0);
  const [{ data: getNewsData, loading: getNewsLoading }, getNewsExecute] = API.useNewsApi({
    url: "/api/news",
    params: {
      pageToken: pageToken,
      // pageSize: 5
    },
    method: "GET",
  }, { manual: true });

  const stompClient = useStompClient();

  const sendMessage = useCallback((message) => {
    console.debug("Websocket sending message /app/news", message)
    stompClient.publish({
      destination: "/app/news",
      body: JSON.stringify(message)
    });
  }, [stompClient]);

  const subscribeSubreddits = useCallback((subreddits) => {
    sendMessage({ subscribe: true, subreddits: subreddits })
  }, [sendMessage])
  const unsubscribeSubreddits = useCallback((subreddits) => {
    sendMessage({ subscribe: false, subreddits: subreddits })
  }, [sendMessage])

  useSubscription("/topic/news", (message) => setMessage(message.body));

  useEffect(() => {
    getNewsExecute();
  }, [])

  const addNews = useCallback((addedNews) => {
    addedNews = addedNews
      .map(assembleNews)
      .filter(item => !news.some(newsItem => newsItem.id === item.id))
      .concat(news)
      .sort((a, b) => b.created - a.created);

    setNews(addedNews)
  }, [news])

  const loadMore = useCallback(() => {
    if (loading) {
      console.log("Still loading")
    } else if (pageToken == null) {
      console.warn("All news loaded")
    } else {
      console.debug("Loading more news")
      getNewsExecute()
    }
  }, [getNewsExecute, loading, pageToken])

  useEffect(() => {
    if (!getNewsLoading && getNewsData) {
      setPageToken(getNewsData.nextPageToken)
      addNews(getNewsData.news)
    }
  }, [getNewsLoading, getNewsData]);

  useEffect(() => {
    if (message === "")
      return;

    try {
      const newsItem = assembleNews(JSON.parse(message));
      addNews([newsItem]);
      console.debug(newsItem);

    } catch (error) {
      console.warn("Can't parse message: " + message, error)
    }
  }, [message]);

  useEffect(() => {
    if (getNewsLoading) {
      setLoading(true);
    }
  }, [getNewsLoading]);

  useEffect(() => {
    setLoading(false)
  }, [news]);

  function assembleNews(news) {
    news.created = new Date(news.created);
    return news
  }

  return { news, loading, loadMore, subscribeSubreddits, unsubscribeSubreddits };
}