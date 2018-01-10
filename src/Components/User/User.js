import React, { Component } from 'react';
import './user.css';

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      userName: ''
    }
    this.provider = new this.props.firebase.auth.GoogleAuthProvider();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }
  componentDidCatch(error, info) {
  // Display fallback UI
    this.setState({ hasError: true });
  }

  handleLogin() {
    this.props.firebase.auth().signInWithPopup( this.provider )
    .then( result => {
      // The firebase.User instance:
      var user =  result.user;
      var credential = result.credential;
      this.setState({
        userName: result.user.displayName,
      })
      this.props.setUser(user.displayName);

    }, error => {

      console.log(error);
    });
  }
  handleLogout() {
    this.props.firebase.auth().signOut();
    this.setState({
      userName: '',
    });
  }

  render() {

      { if(this.state.userName !== '') {
          return (<div className="login-div"><span className='user-name'>{this.state.userName}</span><button className='login-control accent-red' onClick={this.handleLogout}>Sign Out</button></div>);
        }
        else {
          return (<div className="login-div"><button className='login-control accent-red' onClick={this.handleLogin}>Sign In</button></div>);
        }
      }

  }
}

export default User;
