// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#3054d3', 
    },
    secondary: {
      main: '#8797d3', 
    },
  },
  // 추가적인 테마 설정...
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
