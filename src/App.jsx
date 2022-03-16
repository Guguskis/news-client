// import './App.css';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./page/MainPage.jsx";

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

TimeAgo.addDefaultLocale(en);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  return (
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
          <Router>
            <Switch>
              <Route exact path="/" component={MainPage} />
              {/* <Route component={NotFoundPage}/> */}
            </Switch>
          </Router>
          <AppBar position="fixed" color="text" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon color="primary" />
                ) : (
                  <ChevronRightIcon color="primary" />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem button onClick={() => console.log("Click")}>
                <ListItemIcon>
                  <DynamicFeedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItem>
              <ListItem button onClick={() => console.log("Click")}>
                <ListItemIcon>
                  <FilterListIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Subreddits" />
              </ListItem>
            </List>
          </Drawer>
        </LocalizationProvider>
      </StompSessionProvider>
    </ThemeProvider>
  );
}

export default App;
