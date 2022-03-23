import { Container } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import MenuBar from "../components/MenuBar.jsx";

function MenuBarContainer({ children }) {
  return (
    <Container sx={{ pt: 10 }}>
      <MenuBar />
      {children}
    </Container>
  );
}

export default MenuBarContainer;
