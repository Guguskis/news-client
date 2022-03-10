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
      let news = getNewsData.news.map(newsItem => {
        newsItem.created = new Date(newsItem.created);
        return newsItem;
      })
      news.sort((a, b) => a.created - b.created);

      ArraysState.add(setNews, news);
    }
  }, [getNewsLoading, getNewsData]);

  useEffect(() => {
    if (message === "")
      return;

    try {
      const newsItem = JSON.parse(message);
      newsItem.created = new Date(newsItem.created);
      ArraysState.add(setNews, newsItem);
      console.debug(message);

    } catch (error) {
      console.warn("Can't parse message: " + message, error)
    }
  }, [message]);

  return [news];
  // return [news, subscribeChannel, unsubscribeChannel];
}