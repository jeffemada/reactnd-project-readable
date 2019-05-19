import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import './index.css';
import middleware from './middleware';
import reducers from './reducers';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#0d47a1'
    }
  },
  typography: {
    fontSize: 12,
    useNextVariants: true
  }
});

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
