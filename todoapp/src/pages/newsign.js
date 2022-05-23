import React,{useState} from 'react';
import firebase from '../tools/index';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/material';
function Newsign() {
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
        console.log(name,value)
    }
    
    const usestyles=makeStyles({
        Typographystyle:{
            h1:{
            fontWeight:600,
            lineHeight:1.167,
            fontSize:28,
        },
        },
    })
    const classsusestle=usestyles()
    return (
       
        <div className='newSignup'>
           
            <Grid container >
            <Grid item xs={0} md={7} className='grid-img-container'>         
              <img src='https://rai-phr-dashboard.web.app/static/media/SuperuserBg.5ea8bbaa.jpg'></img>
            </Grid>
             <Grid className="box-grid-container"item xs={12} md={5}>
                 <Box className='box-grid' sx={{ flexGrow: 1 }}>
                     <img src="https://rai-phr-dashboard.web.app/static/media/resoluteai-logo.5deeff24.png"/>
                    <div className='box-grid-text'>
                    <Typography variant="h5" align='center' component="div" gutterBottom>
                    ResoluteAI PHR Dashboard
                    </Typography>
                    </div>
                    <Typography variant="h6" align='center' component="div" gutterBottom>
                    Enter your details to login
                    </Typography>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <div className='grid-textfield'>
                    <TextField fullWidth id="outlined-basic" label="Email" name='email' variant="outlined" onChange={(e)=>handlechange(e)}/>
                    </div>
                    <div className='grid-textfield'>
                    <TextField fullWidth id="outlined-basic" label="Password" name='password' variant="outlined" onChange={(e)=>handlechange(e)}/>
                    </div>
                    <Button type="submit" fullWidth variant="contained">Login</Button>
                    </form>
                 </Box>
             </Grid>
            </Grid>
            
        </div>
    );
}

export default Newsign;