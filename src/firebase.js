import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAuIYeda7Jt2QzOKoq88FT93rGqkgS-uBU",
  authDomain: "chattel-70dee.firebaseapp.com",
  databaseURL: "https://chattel-70dee.firebaseio.com",
  projectId: "chattel-70dee",
  storageBucket: "chattel-70dee.appspot.com",
  messagingSenderId: "250506084339"
};
firebase.initializeApp(config);

export default firebase;
