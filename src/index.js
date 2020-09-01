import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from  './theme';

const theme = createMuiTheme(styles);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>, 
    document.getElementById('root'))