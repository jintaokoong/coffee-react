import { blue } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './state/context/auth-context';
import { UIContextProvider } from './state/context/ui-context';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    type: 'light',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UIContextProvider>
      <AuthContextProvider>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthContextProvider>
    </UIContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
