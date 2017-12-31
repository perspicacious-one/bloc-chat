import React, { Component } from 'react';
import './message-list.css';

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.messagesRef = this.props.firebase.database().ref('messages').orderByChild('roomId').equalTo(this.props.activeRoom);

    this.state = {
      messages: [],
    }

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }
  comoponentWillReceiveProps(nextProps) {
    this.setState({ messages: [] });
    this.messagesRef = this.props.firebase.database().ref('messages').orderByChild('roomId').equalTo(this.nextProps.activeRoom);
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
       messages: this.state.messages.concat( message ) });
    });
  }

  render() {
    return (
      <div className="message-container">
        <h2 className="room-name">{this.props.roomName}</h2>
        <ul className="message-list">
        {
          this.state.messages.map( (message) => {
            return (
            <li className="message-row">
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
