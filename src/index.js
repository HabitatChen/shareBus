import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './admin'
import Home from './page/router-demo/router-1/Home'
import IRoute from './page/router-demo/router-2/router'
import IRoute1 from './page/router-demo/router-3/router'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import IRouter from './router'

ReactDOM.render(<IRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
