import React, { Component } from 'react';
import './message-list.css';

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.messageRef = this.props.firebase.database().ref('messages/');

    this.state = {
      messages: [],
      newMessage: '',
      hasError: false,
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  // componentWillMount() {
  //   this.messageRef.LimitToLast(1).on('child_added', snapshot => {
  //     const newMessage = snapshot.val();
  //     newMessage.key = child.parent;
  //     if(newMessage.roomId === this.props.activeRoom) {
  //       this.setState({
  //         messages: this.state.messages.concat( newMessage )
  //       });
  //     }
  //   });
  // }
  componentWillReceiveProps(nextProps) {
    if((nextProps.activeRoom !== this.props.activeRoom) && (nextProps.activeRoom !== undefined)) {
      const newMessageArray = [];

      this.setState({
        messages: [],
      });
      this.messageRef.on('value', snapshot => {
        snapshot.forEach( (child) => {
          const message = child.val();
          message.key = child.parent;

          console.log(message.content);

          if(message.roomId === nextProps.activeRoom) {
            newMessageArray.push(message);
          }
        });
      });
      this.setState({ messages: newMessageArray });
    }
  }
  componentDidCatch(error, info) {
  // Display fallback UI
    this.setState({
      hasError: true,
      error: error
    });
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      newMessage: value
    });
  }

  addMessage() {
    this.messageRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.userName
    });
  }
  convertServerTime(value) {
    try {
      var n = value.toString();

      if(n.indexOf(':') === -1) {
        var result = new Date(0);
        result.setUTCMilliseconds(value);
        return result.toLocaleString('en-US');
      }
      else { return value;}
    }
    catch(err) {
      console.log(err.message);
    }
  }

  render() {
    if(this.state.hasError) {
      return (
        <h2>Oops.. Something went wrong</h2>
      )
    }
    else {
      return (
        <div className="message-container .background-light">
          <h2 className="room-name">{this.props.activeRoomName}</h2>
          <ul className="message-list">
          {
            this.state.messages.map( (message) => {
              return (
              <li key={message.key} className="message-row">
                <span className="message-user">{message.username}</span>
                <span className="message-content">{message.content}</span>
                <span className="message-time">{this.convertServerTime(message.sentAt)}</span>
              </li>
              )
            })
          }
          </ul>
          <form onSubmit={this.addMessage}>
            <textarea className="message-input" onChange={this.handleChange} value={this.state.newMessage} />
            <input className="message-submit accent-blue-green" type="submit" value="Send" />
          </form>
        </div>
      )
    }

  }
}

export default MessageList;
