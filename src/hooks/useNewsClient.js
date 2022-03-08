import { useState, useEffect } from 'react';

import {
  useSubscription,
} from "react-stomp-hooks";
import { ArraysState } from '../utils/utils.jsx';

export function useNewsClient() {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");

  useSubscription("/topic/news", (message) => setMessage(message.body));

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
}