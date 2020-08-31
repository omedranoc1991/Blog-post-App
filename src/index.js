import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import promise from 'redux-promise'

import reducers from './reducers';
import PostsIndex from './components/PostsIndex'
import PostsNews from './components/PostsNews'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
      <Switch>        
        <Route path='/posts/new' component={PostsNews} />
        <Route path='/' component={PostsIndex} />
      </Switch>    
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
