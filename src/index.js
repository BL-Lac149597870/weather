import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
