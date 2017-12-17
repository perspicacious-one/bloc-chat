import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './Components/RoomList/RoomList.js';
import firebase from './firebase.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main className="App-main">
          <aside className="room-list-container">
            <RoomList firebase={firebase}/>
          </aside>
          <section className="chat-room">
          </section>
        </main>
      </div>
    );
  }
}

export default App;
