import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import App from './containers/App';
import store from './redux/store';

let theme = createMuiTheme({
  typography: {
    fontFamily: ['Lato'],
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MUIRichTextEditor: {
      root: {
        height: '300px',
        borderBottom: "1px solid gray",
      }
  }
  }
})

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
