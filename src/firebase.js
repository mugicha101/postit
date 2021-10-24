import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyABbvcK1r3Lqqu-60MWyezKAANFVf7SR-s",
    authDomain: "hackduke2021-dd561.firebaseapp.com",
    databaseURL: "https://hackduke2021-dd561-default-rtdb.firebaseio.com",
    projectId: "hackduke2021-dd561",
    storageBucket: "hackduke2021-dd561.appspot.com",
    messagingSenderId: "887770687081",
    appId: "1:887770687081:web:9a2f41774daa3659da64f8"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.database();