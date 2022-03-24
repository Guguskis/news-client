import { useCallback, useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { API } from "../config/axiosConfig.jsx";

const init = { news: [] };

const useNewsClientDefault = () => {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [pageToken, setPageToken] = useState(0);
  const [{ data: getNewsData, loading: getNewsLoading }, getNewsExecute] =
    API.useNewsApi(
      {
        url: "/api/news",
        params: {
          pageToken: pageToken,
          // pageSize: 5
        },
        method: "GET",
      },
      { manual: true }
    );

  const stompClient = useStompClient();

  const sendMessage = useCallback(
    (channel, message) => {
      console.debug("Websocket sending message /app/news", message);
      stompClient.publish({
        destination: channel,
        body: JSON.stringify(message),
      });
    },
    [stompClient]
  );

  const subscribeSubreddits = useCallback(
    (subreddits) => {
      sendMessage("/app/queue/news/reddit", {
        subscribe: true,
        subreddits: subreddits,
      });
    },
    [sendMessage]
  );
  const unsubscribeSubreddits = useCallback(
    (subreddits) => {
      sendMessage("/app/queue/news/reddit", {
        subscribe: false,
        subreddits: subreddits,
      });
    },
    [sendMessage]
  );

  useSubscription("/user/topic/news", (message) => setMessage(message.body));

  useEffect(() => {
    getNewsExecute();
  }, []);

  const addNews = useCallback(
    (addedNews) => {
      addedNews = addedNews
        .map(assembleNews)
        .filter((item) => !news.some((newsItem) => newsItem.id === item.id))
        .concat(news)
        .sort((a, b) => b.created - a.created);

      setNews(addedNews);
    },
    [news]
  );

  const loadMore = useCallback(() => {
    if (loading) {
      console.log("Still loading");
    } else if (pageToken == null) {
      console.warn("All news loaded");
    } else {
      console.debug("Loading more news");
      getNewsExecute();
    }
  }, [getNewsExecute, loading, pageToken]);

  useEffect(() => {
    if (!getNewsLoading && getNewsData) {
      setPageToken(getNewsData.nextPageToken);
      addNews(getNewsData.news);
    }
  }, [getNewsLoading, getNewsData]);

  useEffect(() => {
    if (message === "") return;

    try {
      const newsItem = assembleNews(JSON.parse(message));
      addNews([newsItem]);
      console.debug(newsItem);
    } catch (error) {
      console.warn("Can't parse message: " + message, error);
    }
  }, [message]);

  useEffect(() => {
    if (getNewsLoading) {
      setLoading(true);
    }
  }, [getNewsLoading]);

  useEffect(() => {
    setLoading(false);
  }, [news]);

  useEffect(() => {
    console.log("INITIALIZED NEWS CLIENT");
  }, []);

  function assembleNews(news) {
    news.created = new Date(news.created);
    return news;
  }

  return {
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
  };
};

export const useNewsClient = singletonHook(init, useNewsClientDefault);
