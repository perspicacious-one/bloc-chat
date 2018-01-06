import React, { Component } from 'react';
import './message-list.css';

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.messageRef = this.props.firebase.database().ref('messages/');

    this.state = {
      messages: [],
    }

    this.addRoomMessages = this.addRoomMessages.bind(this);
  }
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const newMessage = snapshot.val()
      this.addRoomMessages(newMessage);
    });
  }
  addRoomMessages(message) {
    if(message.roomId === this.props.activeRoom) {
      this.setState({ messages: this.state.messages.concat( message ) });
    }
  }

  componentWillReceiveProps(nextProps) {
    if((nextProps.activeRoom !== this.props.activeRoom) && (nextProps.activeRoom !== undefined)) {
      this.setState({
        messages: [],
      });
      this.messageRef.once('value', snapshot => {
        snapshot.forEach( (child) => {
          const newMessage = child.val();
          this.addRoomMessages(newMessage);
        });
      });
    }
  }

  render() {
    return (
      <div className="message-container">
        <h2 className="room-name">{this.props.activeRoomName}</h2>
        <ul className="message-list">
        {
          this.state.messages.map( (message) => {
            return (
            <li key={message.key} className="message-row">
              <span className="message-user">{message.username}</span>
              <span className="message-content">{message.content}</span>
              <span className="message-time">{message.sentAt}</span>
            </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

export default MessageList;
