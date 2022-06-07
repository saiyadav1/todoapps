import React from 'react';
import {Grid} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {
    createTheme,
    ThemeProvider,
  } from "@material-ui/core/styles";
// import resoluteai-logo from '../assets/images/resoluteai-logo.png';
import { makeStyles } from "@material-ui/core";
// import resoluteai-logo from '../assets/images/resoluteai-logo.png';
import ResoluteAILogo from "../assets/images/resoluteai-logo.png";
import SendIcon from '@material-ui/icons/Send';
// import downloadOutlinedIcon from '@material-ui/icons';
// import {GetAppIcon} from '@material-ui/icons/GetAppIcon'
import {useLocation} from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Offerletter(props) {
  const location=useLocation()
  console.log(location.state.detail);
  const data=location.state.detail;
  console.log(data[0].candidateDetails.basicDetails.fullName)
    const theme=createTheme({
        typography:{
            h1:{
                fontSize:24
            },
            h2:{
                fontSize:20
            }
        }
    })
    const useStyles=makeStyles({
        gridContainer:{
            display:"flex",
            
        },
        gridItem:{
            display:"flex",
            justifyContent:"center",
            marginTop:"20px"
        },
        marginT5:{
            marginTop:'5px',
        },
        marginT10:{
            marginTop:'10px',
        },
        marginT20:{
            marginTop:"20px",
        },
        marginT30:{
            marginTop:"30px",
        },
        gridItem1:{
            display:"flex",
            flexDirection:"column",
            alignItems:"start",
            marginTop:"20px",
        },
        btnsendgrid:{
            // marginTop:"200px"
            display:"flex",
            justifyContent:"center",
            // marginBottom:"10px"
        },
        btnsend:{
           display:"flex",
        //    flexDirection:"row-reverse", 
            backgroundColor:"#0000FF",
            color:"#FFFFFF",
            // marginLeft:"auto",
            // marginTop:"5px",
            alignItems:"center",
            margin:"15px",
            marginTop:"5px",

        },
        btndownload:{
            display:"flex",
            backgroundColor:"#4CBB17",
            color:"#FFFFFF",
            alignItems:"center",
            margin:"15px",
            marginTop:"5px",            
        }

        
    })
    const current=new Date();
    const classes=useStyles()
    const Pref = React.createRef();
    const  sendofferletters=async()=>{
        // console.log('clicked',e.target.parentElement.parentElement.parentElement);
        console.log('called')
       
        
          const ele=Pref.current;
          const canvas=await html2canvas(ele);
          const data=canvas.toDataURL('image/png');
          const pdf=new jsPDF();
          const  imgProperties=pdf.getImageProperties(data);
          const pdfWidth=pdf.internal.pageSize.getWidth();
          const pdfHeight=(imgProperties.height*pdfWidth)/imgProperties.width;
          pdf.addImage(data,'PNG',0,0,pdfWidth,pdfHeight);
          pdf.save('print.pdf')
        
    
      }
    return (
        <ThemeProvider theme={theme}>
      <div>
      <div className="offer-letter" ref={Pref} style={{margin:"auto",marginTop:"20px"}}  >
       
       
        <Grid container>
            <Grid item xs={12}  className={classes.gridItem}>
            <img style={{width:'200px'}} src={ResoluteAILogo} alt="img"/>
            </Grid>
        
            <Grid item xs={12} className={classes.gridItem}  >
                <Typography variant="h1"   component="div" gutterBottom>
                Job offer Letter
                </Typography>
            </Grid>
        
            <Grid sx={{display:"flex",flexDirection:"column",alignItems:"start",marginTop:'20px'}} >
                <Typography className={classes.marginT5} variant='h2'>{current.getDate()}-{current.getMonth()}-{current.getFullYear()}</Typography>
                <Typography className={classes.marginT5} variant='h2'><b>{data[0].candidateDetails.basicDetails?.fullName}{" "}</b></Typography>
                {/* <Typography className={classes.marginT5} variant='h2'>{data[0].candidateDetails.internshipDetails?.domain
                          ? data[0].candidateDetails.internshipDetails.domain
                          : "--"}
                </Typography> */}
                <Typography className={classes.marginT5} variant='h2'>Company Name:ResoluteAi</Typography>
                <Typography className={classes.marginT5} variant='h2'>Address:</Typography>
            </Grid>
        <Grid className={classes.gridItem1}>
            <Grid  >
                <Typography>Dear <b>{data[0].candidateDetails.basicDetails?.fullName}{" "}</b>,</Typography>
            </Grid>
            <Grid >
            <Typography variant='body1' >
                We are pleased to offer you the position of <b>{data[0].candidateDetails.internshipDetails?.domain
                          ? data[0].candidateDetails.internshipDetails.domain
                          : "--"}</b> at <b>ResoluteAi</b>. We feel confident that you will contribute your skills and experience to the growth of our organization.
            </Typography>
            </Grid>
            <Grid >
            <Typography variant='body1' sx={{textAlign:'center'}}>
                Please confirm your acceptance of this offer by signing and returning a copy of this offer letter.
            </Typography>
            </Grid>
            <Grid >
            <Typography variant='body1' sx={{textAlign:'center'}}>
            We look forward to Welcoming you board.
            </Typography>
            </Grid>
        </Grid>
        <Grid className={classes.marginT30}>
            <Typography className={classes.marginT5} variant='h2'>Sincerely,</Typography>
            <Typography className={classes.marginT5} variant='h2'><b>ResoluteAi</b></Typography>
            <Typography className={classes.marginT5} variant='h2'>Signing Authority</Typography>
            <Typography className={classes.marginT5} variant='h2'>Position title</Typography>
            
        </Grid>
       </Grid>
       
       
    </div>
    <div>
    <Grid className={classes.btnsendgrid}>
        
    <Button variant='outlined' color='success' className={classes.btndownload}  onClick={sendofferletters}  >
                    Download
        </Button>        
    
         <Button disabled varian="contained" className={classes.btnsend} onClick={sendofferletters} endIcon={<SendIcon />} style={{display:"flex",flexDirection:"row-reverse"}}>
            Send
         </Button>
         
        </Grid> 
    </div>
    </div>
    </ThemeProvider>
    );
}

export default Offerletter;