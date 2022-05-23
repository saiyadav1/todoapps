import React,{useState} from 'react';
import firebase from '../tools/index';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function SignUp(props) {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
  
    const history = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(email.includes('@gmail.com')&&password==confirmpassword){
            firebase.
           auth()
           .createUserWithEmailAndPassword(email,password)
           .then(Response=>{
               console.log(Response)
              history('/');
           })
           .catch((e)=>{
             console.log(e.message);
             if(e.message.includes('auth/email-already-in-use')){
                alert('email already present try different email or signin')
             }
           })
        }
        else if(password!=confirmpassword){
            alert('enter confirm password wrong')
        }
       
    }
    const handlechange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        if(name=='email'){
            setemail(value)
        }
        else if(name=='password'){
            setpassword(value);
        }
        else{
            setconfirmpassword(value)
        }
    }
  
    return (
        <div className='Signup'>
            <form  onSubmit={(e)=>{handleSubmit(e)}}>
                <h1>Enter Details</h1>
                <div>
                <label>Email</label>
                <input type="email" name='email' onChange={(e)=>handlechange(e)}></input>
                </div>
                <div>
                <label>Password</label>
                <input type="password" name='password' onChange={(e)=>handlechange(e)}></input>
                </div>
                <div>
                <label>Confirm Password</label>
                <input type="password" name='confirmpassword' onChange={(e)=>handlechange(e)} ></input>
                </div>
                <button>Sign Up</button>
                <p>Already have an account <Link to="/newsignup">SignIn</Link></p>
            </form>
            <div>
               
            </div>
        </div>
    );
}

export default SignUp;