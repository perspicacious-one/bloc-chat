import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';


<script src="https://www.gstatic.com/firebasejs/4.8.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuIYeda7Jt2QzOKoq88FT93rGqkgS-uBU",
    authDomain: "bloc-chat-70dee.firebaseapp.com",
    databaseURL: "https://bloc-chat-70dee.firebaseio.com",
    projectId: "bloc-chat-70dee",
    storageBucket: "bloc-chat-70dee.appspot.com",
    messagingSenderId: "250506084339"
  };
  firebase.initializeApp(config);
</script>

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
