import React,{useState} from 'react';
import Todolist from './todolist';
import {Button,TextField} from '@material-ui/core'; 
import firebase from '../tools/index';
import { useNavigate } from 'react-router-dom';

function Todoform(props) {

    const [input,setinput]=useState('');
    const [newtodolist,setnewtodolist]=useState([]);
    const history = useNavigate();
    
    const handlechange=(e)=>{
        setinput(e.target.value);
    }
   
    const handlenewsubmit=(e)=>{
        e.preventDefault();
        console.log('called form handlenewsubmit');
        setnewtodolist(oldArray=>[...oldArray,{"todotext":input,"complete":false}])
        setinput('')
    }
    const handledelete=(e)=>{
        const id=e.target.parentElement.parentElement.parentElement.id;
       console.log('from deleted');
        newtodolist.splice(id,1);
        setnewtodolist([...newtodolist])
    }
    const handlecomplete=(e)=>{
       let id=e.target.parentElement.parentElement.id;  
       console.log(id);
       const arr=[...newtodolist]
       let ele=newtodolist[id];
        // ele.complete=!ele.complete;
        if(ele.complete)
        ele.complete=false;
        else
        ele.complete=true;
       arr.splice(id,1,ele);
       console.log(arr);
       setnewtodolist(arr);
}
const handlelogout=(e)=>{
    firebase.auth().signOut()
    .then(()=>console.log('user logged out'))
    history('/signup');
}
    return (
        
        <div className='todo-form'>
            <button onClick={(e)=>handlelogout(e)}>log out</button>
            <div className='todo-form-form'>
            <form onSubmit={handlenewsubmit}>
                <TextField fullWidth id="outlined-basic" value={input} variant="outlined"  onChange={handlechange}/>
                <Button size="small" onClick={handlenewsubmit}   variant="contained" >Add todo</Button>
            </form>
            </div>
            <hr></hr>
            <Todolist list={newtodolist} handledelete={handledelete} handlecomplete={handlecomplete}/>
    </div>
        
        
    );
}

export default Todoform;