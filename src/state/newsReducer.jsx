const newsReducer = (state = { news: ["cryptocurrency"] }, action) => {
  switch (action.type) {
    case "SUBSCRIBE":
      return {
        ...state,
        news: [...state.news, ...action.payload],
      };
    case "UNSUBSCRIBE":
      return {
        ...state,
        news: state.news.filter((n) => n !== action.payload),
      };
    default:
      return state;
  }
};

export default newsReducer;
