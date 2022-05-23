import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase  from './tools/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
firebase.auth().onAuthStateChanged(user=>{
  if(user){
    // console.log(user);
    // console.log(user.email);
    // console.log(user.uid);


  }else{
    console.log('no user');
  }
})

