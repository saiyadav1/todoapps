import React from 'react'
import {Box,Paper,Typography,Grid,Avatar,makeStyles} from '@material-ui/core'
import {useLocation} from 'react-router-dom';
import { PersonOutline} from "@material-ui/icons";
// import { FileOpenIcon} from "@material-ui/icons";

const useStyles=makeStyles((theme)=>{
    return{
        rowHead:{
        backgroundColor: "#EFEFEF",
        padding:'10px'
        },
        gridsmallhidden:{
        marignTop:'50px',
        display:'flex',
        [theme.breakpoints.up('md')]: {
             display:'none',
        }
        },
        gridlargehidden:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'20px',
        borderRight:"1px solid grey",
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
        },
        gridItem:{
            marginTop:'10px',
            marginLeft:'10px',
            marginBottom:'10px',
            display:'flex',
            flexDirection:'column',
            justifyContents:"start",
        }
}
})

function InternsDetails(){
    const classes=useStyles();

    console.log('from internships details')
    const location=useLocation()
    console.log(location.state.detail);
    const data=location.state.detail;
    console.log(data[0].candidateDetails.basicDetails.fullName)
    return(
  
        <Grid >
            <Paper  >
               
               <Grid className={classes.rowHead}>
               <Typography variant='subtitle1' >
                   Basic-Details
                </Typography>
                </Grid>
                <Grid container>
                <Grid item xs={12} md={0} className={classes.gridsmallhidden}>
                <Avatar
                    src={
                    data[0].candidateDetails.attachments?.photoUrl ? (
                    data[0].candidateDetails.attachments?.photoUrl
                    ) : (
                    <PersonOutline />
                    )
                    }
                    style={{
                    width: 50,
                    height: 50,
                    marginTop: "20px",
                    // marginBottom:"10px",
                    marginLeft:'10px',
                    
                    }}
                    aria-label="profile image"
                ></Avatar>
                </Grid>
                <Grid item  md={4} 
                className={classes.gridlargehidden}
                >
                <Avatar
                    src={
                    data[0].candidateDetails.attachments?.photoUrl ? (
                    data[0].candidateDetails.attachments?.photoUrl
                    ) : (
                    <PersonOutline />
                    )
                    }
                    style={{
                    width: 200,
                    height: 200,
                    }}
                    aria-label="profile image"
                ></Avatar>
                </Grid>
               
                <Grid item xs={12} md={6} className={classes.gridItem}  >
                <Typography variant='body1'>
                <b>FullName</b>: {data[0].candidateDetails.basicDetails?.fullName}{" "}
                </Typography>
                <Typography variant='body1'>
                <b>PhoneNumber</b>: {data[0].candidateDetails.basicDetails?.phoneNumber}{" "}
                </Typography>
                <Typography variant='body1'>
                <b>Email</b>: {data[0].candidateDetails.basicDetails?.email}{" "}
                </Typography>
                <Typography variant='body1'>
                <b>Location</b>: {data[0].candidateDetails.basicDetails?.location}{" "}
                </Typography>
                <Typography variant='body1'>
                <b>CollegeName</b>: {data[0].candidateDetails.basicDetails?.collegeName}{" "}
                </Typography>
                <Typography variant='body1'>
                <b>ParentName</b>: {data[0].candidateDetails.basicDetails?.parentName}{" "}
                 </Typography>
                <Typography variant='body1'>
                <b>AltContactPersonName</b>: {data[0].candidateDetails.basicDetails?.altContactPersonName}{" "}
                </Typography>         
                <Typography variant='body1'>
                <b>AltContactPersonNo</b>: {data[0].candidateDetails.basicDetails?.altContactPersonNo}{" "}
                </Typography>       
                <Typography variant='body1'>
                <b>Qualification</b>: {data[0].candidateDetails.basicDetails?.qualification}{" "}
                </Typography>
                </Grid>
                </Grid>
            </Paper>
           
           
           <Paper style={{marginTop:'20px'}} colSpan={6}>
                <Grid className={classes.rowHead}>
                    <Typography variant='subtitle1'>
                        Bank Details
                    </Typography>
                </Grid>
                <Grid className={classes.gridItem}>
                    <Typography variant='body1'>
                        <b>AccHolderName</b>: {data[0].candidateDetails.bankDetails?.accHolderName
                        ?data[0].candidateDetails.bankDetails.accHolderName:"--"}
                    </Typography>
                    <Typography variant='body1'>
                        <b>AccNumber</b>: {data[0].candidateDetails.bankDetails?.accNumber
                        ?data[0].candidateDetails.bankDetails.accNumber:"--"}
                    </Typography>
                    <Typography variant='body1'>
                        <b>BankName</b>: {data[0].candidateDetails.bankDetails?.bankName
                        ?data[0].candidateDetails.bankDetails.bankName:"--"}
                    </Typography>
                    <Typography variant='body1'>
                        <b>BranchName</b>: {data[0].candidateDetails.bankDetails?.branchName
                        ?data[0].candidateDetails.bankDetails.branchName:"--"}
                    </Typography>
                    <Typography variant='body1'>
                        <b>IsfcCode</b>: {data[0].candidateDetails.bankDetails?.isfcCode
                        ?data[0].candidateDetails.bankDetails.isfcCode:"--"}
                    </Typography>
                </Grid>
            </Paper>
            
            <Paper style={{marginTop:'20px'}}>
                <Grid className={classes.rowHead}>
                    <Typography variant='subtitle1'>
                        Internship-Details
                    </Typography>
                </Grid>
                <Grid className={classes.gridItem}>
                <Typography variant='body1'>
                <b>Designation</b>: {data[0].candidateDetails.internshipDetails?.designation
                ?data[0].candidateDetails.internshipDetails.designation
                : "--"}
                </Typography>
                <Typography variant='body1'>
                <b>Domain</b>: {data[0].candidateDetails.internshipDetails?.domain
                ? data[0].candidateDetails.internshipDetails.domain
                : "--"}
                </Typography>
                <Typography variant='body1'>
                <b>StartDate</b>: {data[0].candidateDetails.internshipDetails?.startDate
                 ? data[0].candidateDetails.internshipDetails.startDate
                  : "--"}
                </Typography>
                <Typography variant='body1'>
                <b>EndDate</b>: {data[0].candidateDetails.internshipDetails?.endDate
                ? data[0].candidateDetails.internshipDetails.endDate
                : "--"}
                </Typography>
                <Typography variant='body1'>
                <b>InternshipPeriod</b>: {data[0].candidateDetails.internshipDetails?.internshipPeriod
                ? data[0].candidateDetails.internshipDetails.internshipPeriod
                : "--"}
                </Typography>
                <Typography variant='body1'>
                <b>WorkMode</b>: {data[0].candidateDetails.internshipDetails?.workMode
                ? data[0].candidateDetails.internshipDetails.workMode
                 : "--"}
                </Typography>
                </Grid>
                </Paper>
                
                <Paper style={{marginTop:'20px'}}>
                <Grid className={classes.rowHead}>
                    <Typography variant='subtitle1'>
                        Documents
                    </Typography>
                </Grid>
                {/* <Grid>
                    <a href={data[0].candidateDetails.attachments.aadharCardUrl} target='_blank'><FileOpenIcon></FileOpenIcon></a>
                </Grid> */}
                <Grid>
                    <img src='' alt='img'/>
                </Grid>
                <Grid>
                    <img src='' alt='img'/>
                </Grid>
                <Grid>
                    <img src='' alt='img'/>
                </Grid>
                </Paper>
        </Grid>
    )
}
export default InternsDetails;