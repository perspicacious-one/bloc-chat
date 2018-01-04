import React, { Component } from 'react';
import './message-list.css';

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
    this.messageRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      if(message.roomID === this.props.activeRoom) {
        this.setState({ messages: this.state.messages.concat( message ) });
      }
    });
  }
  resetMessages() {
    this.setState({
      messages: [],
    });
  }
  componentWillReceiveProps(nextProps) {
    if((nextProps.activeRoom !== this.props.activeRoom) && nextProps.activeRoom !== undefined) {
      this.resetMessages();

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
