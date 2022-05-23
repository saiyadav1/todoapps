
import  firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCZmKIwCtZ2tQXC5WOJwrCcVj_3sY-xe8E",
  authDomain: "todoapp-15242.firebaseapp.com",
  projectId: "todoapp-15242",
  storageBucket: "todoapp-15242.appspot.com",
  messagingSenderId: "175443143056",
  appId: "1:175443143056:web:1bbb810d76b89230dbeb15",
  measurementId: "G-ZWZKYDPN4L"
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export default firebase;