import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList/RoomList.js';
import MessageList from './Components/MessageList/MessageList.js';
import firebase from './firebase.js';


class App extends Component {
  constructor() {
    super()

    this.initialRoom = firebase.database().ref('rooms/').limitToFirst(1);
    this.roomsRef = firebase.database().ref('rooms/');

    this.state = {
      activeRoom: '',
      activeRoomName: ''
    }

    this.setInitialRoom = this.setInitialRoom.bind(this);
    this.handleRoomClick = this.handleRoomClick.bind(this);
  }
  componentDidMount() {
    this.initialRoom.once('child_added', snapshot => {
      this.setInitialRoom(snapshot.val(), snapshot.key);
    });

  }
  setInitialRoom(room, key) {
    this.setState({
      activeRoom: key,
      activeRoomName: room.name
    });
  }

  handleRoomClick(e) {
    this.roomsRef.orderByChild('name').equalTo(e.target.innerText).once('child_added', snapshot => {
      this.setNewRoom(snapshot.val(), snapshot.key)
    });
  }
  setNewRoom(room, key) {
    this.setState({
     activeRoom: key,
     activeRoomName: room.name,
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main className="App-main">
          <aside className="room-list-container">
            <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick} />
          </aside>
          <section className="chat-room">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} activeRoomName={this.state.activeRoomName} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
