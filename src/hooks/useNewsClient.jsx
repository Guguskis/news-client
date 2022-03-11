import { useState, useEffect, useCallback, useRef } from 'react';

import { useSubscription } from "react-stomp-hooks";
import { ArraysState } from '../utils/utils.jsx';

import { API } from '../config/axiosConfig.jsx';

export function useNewsClient() {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [pageToken, setPageToken] = useState(0);
  const [{ data: getNewsData, loading: getNewsLoading, error: getNewsError }, getNewsExecute] = API.useNewsApi({
    url: "/api/news",
    params: {
      pageToken: pageToken
    },
    method: "GET",
  }, { manual: true });

  useSubscription("/topic/news", (message) => setMessage(message.body));

  useEffect(() => {
    getNewsExecute();
  }, [])

  const addNews = useCallback((addedNews) => {
    let fetchedNews = addedNews
      .map(assembleNews)
      .filter(item => !news.some(newsItem => newsItem.id === item.id))
      .concat(news)
      .sort((a, b) => b.created - a.created);

    setNews(fetchedNews)
  }, [news])


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

  const loadMore = () => {
    if (loading) {
      console.log("Still loading")
      return;
    }
    else if (pageToken == null) {
      console.warn("All news loaded")
      return;
    } else {
      console.debug("Loading more news")
      getNewsExecute()
    }
  }

  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  });

  function assembleNews(news) {
    news.created = new Date(news.created);
    return news
  }


  return { news, loading, loadMoreRef };
  // return [news, subscribeChannel, unsubscribeChannel];
}