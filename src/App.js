import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList/RoomList.js';
import MessageList from './Components/MessageList/MessageList.js';
import firebase from './firebase.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.initialRoom = firebase.database().ref('rooms').limitToFirst(1);

    this.state = {
      activeRoom: '',
      messageRef: firebase.database().ref('messages'),
    }
    this.handleRoomClick = this.handleRoomClick.bind(this)
  }
  componentDidMount() {
    this.initialRoom.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        activeRoom: room,
        messageRef: firebase.database().ref('messages').orderByChild('roomId').equalTo(this.state.activeRoom)
      });
    });
  }
  handleRoomClick(e) {
    const targetRoom = e.target.innerText;
    if (targetRoom !== null) {
      this.setState({
        activeRoom: targetRoom,
        messageRef: firebase.database().ref('messages').orderByChild('roomId').equalTo(targetRoom)
      })
    }
    else {
      alert("Can't find room: " + targetRoom);
    }
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
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
