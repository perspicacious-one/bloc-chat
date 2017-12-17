import React, { Component } from 'react';
import './room-list.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: []
    }
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
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
      </ul>
    )
  }
}

export default RoomList;
