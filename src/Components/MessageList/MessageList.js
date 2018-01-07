import React, { Component } from 'react';
import './message-list.css';

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.messageRef = this.props.firebase.database().ref('messages/');

    this.state = {
      messages: [],
    }
    //this.addRoomMessages = this.addRoomMessages.bind(this);
  }
  // addRoomMessages(message, activeRoom = this.props.activeRoom) {
  //   if(message.roomId === activeRoom) {
  //     if (this.state.messages.includes(message)) { return; }
  //     else {
  //       this.setState({ messages: this.state.messages.concat( message ) });
  //     }
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if((nextProps.activeRoom !== this.props.activeRoom) && (nextProps.activeRoom !== undefined)) {
      const newMessageArray = [];

      this.setState({
        messages: [],
      });
      this.messageRef.on('value', snapshot => {
        snapshot.forEach( (child) => {
          const newMessage = child.val();
          newMessage.key = child.parent;

          if(newMessage.roomId === nextProps.activeRoom) {
            newMessageArray.push(newMessage);
          }
          //this.addRoomMessages(newMessage, nextProps.activeRoom);
        });
      });
      this.setState({ messages: newMessageArray });

    }
  }
  o() {

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
