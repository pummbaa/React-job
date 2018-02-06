import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './containers/login/Login'
import Register from './containers/register/Register'
import AuthRoute from './components/authRoute/AuthRoute'
import Bossinfo from './containers/bossinfo/Bossinfo'
import Geniusinfo from './containers/geniusinfo/Geniusinfo'
import Dashbord from './components/dashbord/Dashbord'
import Chat from './components/chat/Chat'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <Route path='/bossinfo' component={Bossinfo}></Route>
          <Route path='/geniusinfo' component={Geniusinfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:user" component={Chat}></Route>
          <Route component={Dashbord}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
