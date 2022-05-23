import React,{useState} from 'react';
import firebase from '../tools/index';
import { useNavigate } from 'react-router-dom';
function SignIn() {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const history = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('signIn')
        firebase.
           auth()
           .signInWithEmailAndPassword(email,password)
           .then(Response=>{
               console.log(Response)
               history('/');
           })
           .catch((e)=>{
               console.log(e);
           })
    }
    const handlechange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        if(name=='email'){
            setemail(value)
        }
        else{
            setpassword(value);
        }
    }
   
  
    return (
        <div className='Signup'>
            <form  onSubmit={(e)=>{handleSubmit(e)}}>
                <h1>Sign In</h1>
                <div>
                <label>Email</label>
                <input type="email" name='email' onChange={(e)=>handlechange(e)}></input>
                </div>
                <div>
                <label>Password</label>
                <input type="password" name='password' onChange={(e)=>handlechange(e)}></input>
                </div>
                <button>Sign In</button>
            </form>
       
        </div>
    );
}

export default SignIn;