// import './App.css';
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SingletonHooksContainer } from "react-singleton-hook";
import { StompSessionProvider } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import RedditSubscriptionForm from "./components/RedditSubscriptionForm.jsx";
import MainPage from "./page/MainPage.jsx";
import reducers from "./state/reducers.jsx";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#90caf9",
      secondary: "#6098c6",
      disabled: "#6098c6",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#212121",
      paper: "#424242",
    },
  },
});

toast.configure({
  position: "top-right",
  autoClose: 5000,
});
const store = createStore(reducers, {});
TimeAgo.addDefaultLocale(en);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StompSessionProvider
          url={"ws://86.100.240.140:9081/news/websocket"}
          debug={(str) => {
            console.debug("NEWS: " + str);
          }}
        >
          <LocalizationProvider dateAdapter={DateAdapter}>
            <ToastContainer />
            <CssBaseline />
            <SingletonHooksContainer />
            <Router>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route
                  exact
                  path="/subscriptions"
                  component={RedditSubscriptionForm}
                />
                {/* <Route component={NotFoundPage}/> */}
              </Switch>
            </Router>
          </LocalizationProvider>
        </StompSessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
