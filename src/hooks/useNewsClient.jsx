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
      pageToken: pageToken,
      // pageSize: 5
    },
    method: "GET",
  }, { manual: true });

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
      return;
    }
    else if (pageToken == null) {
      console.warn("All news loaded")
      return;
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
      // fixme if I leave app open for longer period of time this line causes all news data to be loaded via pagination
      // addNews([newsItem]); 
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


  return { news, loading, loadMore };
  // return [news, subscribeChannel, unsubscribeChannel];
}