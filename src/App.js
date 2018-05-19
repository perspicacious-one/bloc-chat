import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList/RoomList.js';
import MessageList from './Components/MessageList/MessageList.js';
import User from './Components/User/User.js';
import firebase from './firebase.js';


class App extends Component {
  constructor() {
    super()

    //this.initialRoom = firebase.database().ref('rooms/').limitToFirst(1);
    this.roomsRef = firebase.database().ref('rooms/');

    this.state = {
      // activeRoom: '',
      // activeRoomName: '',
      user: '',
      isLoggedIn: false
    }
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.setUser = this.setUser.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
  }
  componentWillMount() {
    this.roomsRef.orderByKey().limitToFirst(1).once('child_added', snapshot => {
      this.setNewRoom(snapshot.val(), snapshot.key);
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
  setUser(user) {
    this.setState({
      user: user,
    });
    this.toggleLoggedIn(user);
  }
  toggleLoggedIn(user) {
    if(this.state.isLoggedIn) {
      if(user.displayName === undefined || user.displayName === null) {
        this.setState({
          isLoggedIn: false
        });
      }
    } else {
      if(user.displayName !== undefined) {
        this.setState({
          isLoggedIn: true
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
          <User className="login-control" firebase={firebase} setUser={this.setUser} />
        </header>
        <main className="App-main">
          <aside className="room-list-container">
            <RoomList firebase={firebase} handleRoomClick={this.handleRoomClick} />
          </aside>
          <section className="chat-room">
          {this.state.isLoggedIn ? (
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              activeRoomName={this.state.activeRoomName}
              userName={this.state.user.displayName}
            />
          ) : (
            <p>Please sign in to view messages</p>
          )}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
