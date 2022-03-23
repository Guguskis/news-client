import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
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
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/styles";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function MenuBar() {
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  return (
    <>
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
          <ListItem button onClick={() => history.push("/")}>
            <ListItemIcon>
              <DynamicFeedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItem>
          <ListItem button onClick={() => history.push("/subscriptions")}>
            <ListItemIcon>
              <FilterListIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Subreddits" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default MenuBar;
