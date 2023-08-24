import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import AppContextProvider from 'context/AppContext';
import { createGlobalStyle } from 'styled-components';
import { WagmiConfig } from 'wagmi';

import { router } from './router';
import { theme } from './theme';
import { wagmiConfig } from './wagmiConfig';

const GlobalStyles = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    background-image: linear-gradient(0deg, #e5e5fe, white);
  }

  body * button {
    appearance: none;
  }
`;

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <GlobalStyles />
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </ThemeProvider>
    </WagmiConfig>
  );
}

export default App;
