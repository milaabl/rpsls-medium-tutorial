import React from "react";
import "./App.css";
import { WagmiConfig } from "wagmi";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";

import { wagmiConfig } from "./wagmiConfig";
import { theme } from "./theme";
import { router } from "./router";
import AppContextProvider from "context/AppContext";

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default App;
