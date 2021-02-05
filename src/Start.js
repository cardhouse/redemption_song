import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import App from "./App";
import Counter from "./Counter";
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '4ccf3005de75c66366d9',
    authEndpoint: process.env.REACT_APP_NGROK_DOMAIN + '/api/broadcasting',
    cluster: 'us2',
    forceTLS: true
});

export default function Start() {
    return (
      <Router>
        <div>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/count">
              <Counter />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }