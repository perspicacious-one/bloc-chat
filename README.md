# Bloc-chat

A chat app built with React & Firebase.
_**this app is no longer actively developed or supported**_

### Get Started

1. Download or clone the repo. `git clone git@github.com:perspicacious-one/bloc-chat.git`
2. In your terminal: `cd bloc-chat`
3. Run `npm install`
4. Set up your firebase project linkage in firebase.js:

    ```javascript
    import firebase from 'firebase';

    const config = {
      apiKey: "<your-api-key>",
      authDomain: "<your-auth-domain",
      databaseURL: "https://<your-project-id>.firebaseio.com",
      projectId: "<your-project-id>",
      storageBucket: "<your-project-storage>",
    };
    firebase.initializeApp(config);

    export default firebase;
    ```
5. Set up your Firebase Real-time database structure:

    ```json
    "<project-id>": {
      "rooms": {
        "id": {
          "name": "value"
        }
      },
      "messages": {
        "id": {
          "username": "value",
          "content": "value",
          "sentAt": "value",
          "roomId": "value"
        }
      }
    }
    ```
6. Set up your Firebase authentication (read how in the [Firebase docs](https://firebase.google.com/docs/auth/?authuser=0))
7. Run `npm start`


### Notes
#### References:

**Rooms** - `this.props.firebase.database().ref('rooms');`

**Messages** - `this.props.firebase.database().ref('messages');`

#### Authentication:

User authentication is provided through Firebase Authentication.

`this.props.firebase.auth.GoogleAuthProvider();`

#### React

_Warning! This project was built using React lifecycle methods that are now outdated._

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
