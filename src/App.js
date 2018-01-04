import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList/RoomList.js';
import MessageList from './Components/MessageList/MessageList.js';
import firebase from './firebase.js';


class App extends Component {
  constructor() {
    super()
    this.initialRoom = firebase.database().ref('rooms').limitToFirst(1);
    this.state = {
      activeRoom: '',
      activeRoomName: ''
    }
    this.roomsRef = firebase.database().ref('rooms/');
    this.handleRoomClick = this.handleRoomClick.bind(this);
  }
  componentWillMount() {
    this.initialRoom.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        activeRoom: room.key,
        activeRoomName: room.name
      });
    });
  }
  handleRoomClick(e) {
    this.roomsRef.orderByChild('name').equalTo(e.target.innerText).on('child_added', snapshot => {
      const target = snapshot.val();
      target.id = snapshot.key;
      this.setState({
       activeRoom: target.id,
       activeRoomName: target.name,
      });
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
