import { useState, useEffect, useCallback } from 'react';

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

  const mergeLoadedNews = useCallback(() => {
    let fetchedNews = getNewsData.news
      .map(assembleNews)
      .filter(item => !news.some(newsItem => newsItem.id === item.id))
      .concat(news)
      .sort((a, b) => a.created - b.created);

    setNews(fetchedNews)
  }, [news, getNewsData])

  useEffect(() => {
    getNewsExecute();
  }, [])

  useEffect(() => {
    if (!getNewsLoading && getNewsData) {
      console.log(getNewsData.nextPageToken)
      setPageToken(getNewsData.nextPageToken)
      mergeLoadedNews()
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

  useEffect(() => {
    if (getNewsLoading) {
      setLoading(true);
    }
  }, [getNewsLoading]);

  useEffect(() => {
    setLoading(false)
  }, [news]);

  function loadMore() {
    if (getNewsLoading || pageToken == null)
      return;
    getNewsExecute()
  }

  function assembleNews(news) {
    news.created = new Date(news.created);
    return news
  }


  return { news, loading, loadMore };
  // return [news, subscribeChannel, unsubscribeChannel];
}