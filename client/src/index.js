import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import ApolloProvider from "react-apollo/ApolloProvider";

//USE THESE DEBUG HElping lines
//import axios from 'axios';
//window.axios = axios;


const httpLink = createHttpLink({ uri: process.env.REACT_APP_SHOPIFY_GQL})

const middlewareLink = setContext(() => ({
    headers: {
        'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_X_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
}))

const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
})

const store = createStore(reducers, {},applyMiddleware(reduxThunk));

ReactDOM.render(
        <ApolloProvider client={client}>
            <Provider store={store}><App/></Provider>
        </ApolloProvider>,
    document.getElementById('root'),
);

//<Provider store={store}><App/></Provider>
