import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAuIYeda7Jt2QzOKoq88FT93rGqkgS-uBU",
  authDomain: "bloc-chat-70dee.firebaseapp.com",
  databaseURL: "https://bloc-chat-70dee.firebaseio.com",
  projectId: "bloc-chat-70dee",
  storageBucket: "bloc-chat-70dee.appspot.com",
  messagingSenderId: "250506084339"
};
firebase.initializeApp(config);

export default firebase;
