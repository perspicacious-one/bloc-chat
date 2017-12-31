import React, { Component } from 'react';
import AddIcon from './icons/ic_add_24px.svg';
import './room-list.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      newRoom: '',
      rooms: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState({
      newRoom: value
    });
  }
  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoom
    });
    this.setState({
      newRoom: 'Create room'
    });
  }
  deleteRoom(room, key, e) {
    e.preventDefault();
    const delRoom = this.props.firebase.database().ref('rooms/'+ key);
    //const i = this.state.rooms.indexOf(room);
    delRoom.remove();
    this.setState({
      rooms: this.state.rooms.filter( item => item.key !== key)
    });
  }

  render() {
    return (
      <ul className="room-list">
        {
          this.state.rooms.map( (room) => {
            return (
              <li key={room.key}><span onClick={this.props.handleRoomClick}>{room.name}</span><i className="material-icons delete-icon" onClick={this.deleteRoom.bind(this, room, room.key)}>delete_forever</i></li>
            )
          })
        }
        <li>
          <form onSubmit={this.createRoom}>
            <input type="text" id="new-room-input" value={this.state.newRoom} onChange={this.handleInputChange} placeholder="Create new room"/>
            <input id="submit-icon" type="image" src={AddIcon}/>
          </form>
        </li>
      </ul>

    )
  }
}

export default RoomList;
