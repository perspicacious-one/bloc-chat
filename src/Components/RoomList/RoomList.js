import React, { Component } from 'react';
import AddIcon from '../../assets/icons/ic_add_24px.svg';
import './room-list.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      newRoomName: 'Create room',
      rooms: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
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
      name: this.state.newRoomName
    });
  }
  render() {
    return (
      <ul className="room-list">
        {
          this.state.rooms.map( (room) => {
            return (
              <li>{room.name}</li>
            )
          })
        }
        <li>
          <form onSubmit={this.createRoom()}>
            <textarea id="new-room-input" value={this.state.newRoomName} onChange={this.handleInputChange}/>
            <input type="submit" value={AddIcon} />
          </form>
        </li>
      </ul>

    )
  }
}

export default RoomList;
