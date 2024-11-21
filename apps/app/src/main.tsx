import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@mantine/core/styles.css';
import Login from './pages/login/login';
import Home from './pages/home/home';
import { ExpensiveApiProvider } from './context/expensive';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ExpensiveApiProvider baseUrl="http://localhost:4000/api">
        <MantineProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </MantineProvider>
      </ExpensiveApiProvider>
    </BrowserRouter>
  </StrictMode>
);
