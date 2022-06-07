import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  Avatar,
  withStyles,
  InputAdornment,
  Button,
  Tooltip,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Chip
  
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { PersonOutline} from "@material-ui/icons";
import SendIcon from '@material-ui/icons/Send';
// import {OpenInNewIcon} from '@material-ui/icons/OpenInNewIcon'
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ComboBox from '../../tools/autocomplets'
import { useHistory, useParams } from "react-router-dom";
var XLSX = require("xlsx");
const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `30px`,
      },
    },
  },
})(TextField);

const headings = [
  "Profile photo",
  "Full Name",
  "Email",
  "Domain",
  "Start Date",
  "End Date",
  "Profile Status",
  "Offer Status",
  "Internship Status",
  "Send offer Letter",
  "Interns Detail"
];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSelect-root": {
      padding: theme.spacing(1, 4),
    },
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHead: {
    minWidth:'100%',
    backgroundColor: "#EFEFEF",
  },
  card: {
    padding: theme.spacing(3, 4),
  },
  actionIcons: {
    // marginRight: "20px",
  },
  filters:{
    minWidth:'100px'
  },
  downloadbtn:{
    backgroundColor:'green',
    color:'white'
  },
  tableheadrow:{
    minWidth:'100vw',
  },

}));
// console.log('filteredddata',filteredData)
export default function DataTable({ candidatesData, filteredData ,filtervalueselected,isvalueselected}) {
  const classes = useStyles();
  const [emptyTable, setEmptyTable] = useState(false);
  const { setTitle } = useContext(DataContext);
  let history = useHistory();
  

  //Pagination task
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  console.log(filteredData)
  const downloadexcel=()=>{
    const interdata=[];
    const value=filteredData.length==0?candidatesData:filteredData
      // filteredData
      value.forEach((row)=>{
      interdata.push({
        name:row.candidateDetails.basicDetails?.fullName
        ?row.candidateDetails.basicDetails.fullName:"--",
        email:row.candidateDetails.basicDetails.email,
        Designation:row.candidateDetails.internshipDetails?.designation
        ?row.candidateDetails.internshipDetails.designation
        : "--",
        domain:row.candidateDetails.internshipDetails?.domain
          ? row.candidateDetails.internshipDetails.domain
          : "--",
        startDate:row.candidateDetails.internshipDetails?.startDate
        ? row.candidateDetails.internshipDetails.startDate
        : "--",
        endDate:row.candidateDetails.internshipDetails?.endDate
        ? row.candidateDetails.internshipDetails.endDate
        : "--",
        internshipPeriod:row.candidateDetails.internshipDetails?.internshipPeriod
        ? row.candidateDetails.internshipDetails.internshipPeriod
        : "--",
        workMode:row.candidateDetails.internshipDetails?.workMode
        ? row.candidateDetails.internshipDetails.workMode
        : "--",
        profile:row.candidateDetails.profileComplete
        ? "Completed"
        : "Incomplete",
        AltcontactPersonName:row.candidateDetails.basicDetails?.altContactPersonName
        ?row.candidateDetails.basicDetails.altContactPersonName:"--",
        AltcontactPersonNo:row.candidateDetails.basicDetails?.altContactPersonNo
        ?row.candidateDetails.basicDetails.altContactPersonNo:"--",
        collegeName:row.candidateDetails.basicDetails?.collegeName
        ?row.candidateDetails.basicDetails.collegeName:"--",
        experienceDetails:row.candidateDetails.basicDetails?.experienceDetails
        ?row.candidateDetails.basicDetails.experienceDetails:"--",
        fullName:row.candidateDetails.basicDetails?.fullName
        ?row.candidateDetails.basicDetails.fullName:"--",
        location:row.candidateDetails.basicDetails?.location
        ?row.candidateDetails.basicDetails.location:"--",
        parentName:row.candidateDetails.basicDetails?.parentName
        ?row.candidateDetails.basicDetails.parentName:"--",
        phoneNumber:row.candidateDetails.basicDetails?.phoneNumber
        ?row.candidateDetails.basicDetails.phoneNumber:"--",
        qualification:row.candidateDetails.basicDetails?.qualification
        ?row.candidateDetails.basicDetails.qualification:"--",
        accHolderName:row.candidateDetails.bankDetails?.accHolderName
        ?row.candidateDetails.bankDetails.accHolderName:"--",
        accNumber:row.candidateDetails.bankDetails?.accNumber
        ?row.candidateDetails.bankDetails.accNumber:"--",
        bankName:row.candidateDetails.bankDetails?.bankName
        ?row.candidateDetails.bankDetails.bankName:"--",
        branchName:row.candidateDetails.bankDetails?.branchName
        ?row.candidateDetails.bankDetails.branchName:"--",
        isfcCode:row.candidateDetails.bankDetails?.isfcCode
        ?row.candidateDetails.bankDetails.isfcCode:"--",
      })
    })
    console.log(interdata);
    const workSheet=XLSX.utils.json_to_sheet(interdata)
    const workBook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook,workSheet,"interns")

    let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    XLSX.writeFile(workBook,"internsData.xlsx")
  }
  
  const  sendofferletter=(e)=>{
   const ele=e.target.parentElement.parentElement.id;
   console.log(ele)
   const data=isvalueselected?candidatesData:filteredData
   const data1=[]
   data.forEach((row)=>{
     if(row.candidateDetails.basicDetails.email==ele){
       console.log(row)
       data1.push(row);
     }
   })
   console.log(data1[0].candidateDetails.basicDetails.fullName)
    history.push({
      pathname:'/dashboard/offerletter',
      state:{detail:data1}
    });
    e.stopPropagation();
  }

  const InternsCompleteDetail=(e)=>{
  const ele=e.target.parentElement.parentElement.id;
   console.log(ele)
   const data=isvalueselected?candidatesData:filteredData
   const data1=[]
   data.forEach((row)=>{
     if(row.candidateDetails.basicDetails.email==ele){
       console.log(row)
       data1.push(row);
     }
   })
   console.log(data1[0].candidateDetails.basicDetails.fullName)
    history.push({
      pathname:'/dashboard/internsDetails',
      state:{detail:data1}
    });
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, 13 - page * rowsPerPage);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHead} colSpan={12}>
            <TableRow className={classes.tableheadrow} colSpan={12} >
              <TableCell colSpan={4}>
                <Button  variant="contained" className={classes.downloadbtn} color="success"  onClick={downloadexcel} >Download</Button>
              </TableCell>
               <TableCell colSpan={4} >
               <b>OverView</b>
                </TableCell>
           
              <TableCell  colSpan={4}>
                
                  <ComboBox filtervalueselected={filtervalueselected}/>
             
              </TableCell> 

            </TableRow>
            <TableRow>
              {headings.map((heading) => (
                <TableCell align="center">
                  <b> {heading}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            isvalueselected
              ? candidatesData &&
                candidatesData
                .map
                ((row, index) => {
                  return (
                    <TableRow key={index} id={row.candidateDetails.basicDetails.email}>
                      <TableCell align="center">
                        <Avatar
                          src={
                            row.candidateDetails.attachments?.photoUrl ? (
                              row.candidateDetails.attachments?.photoUrl
                            ) : (
                              <PersonOutline />
                            )
                          }
                          style={{
                            width: 30,
                            height: 30,
                            margin: "0 auto",
                          }}
                          aria-label="profile image"
                        ></Avatar>
                      </TableCell>
                      <TableCell id="fullname"align="center">
                        {row.candidateDetails.basicDetails?.fullName}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.basicDetails?.email}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.domain
                          ? row.candidateDetails.internshipDetails.domain
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.startDate
                          ? row.candidateDetails.internshipDetails.startDate
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.endDate
                          ? row.candidateDetails.internshipDetails.endDate
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.profileComplete
                          ? "Completed"
                          : "Incomplete"}
                      </TableCell>
                      <TableCell align="center">--</TableCell>
                      <TableCell align="center">--</TableCell>
                      <TableCell align="center" id={row.candidateDetails.basicDetails.email}>
                      <Button variant="contained"  onClick={sendofferletter} id={row.candidateDetails.basicDetails.email} >
                          Send
                      </Button>
                      </TableCell>
                      <TableCell align="center" id={row.candidateDetails.basicDetails.email}>
                      
                        <OpenInNewIcon color='primary' fontSize='small' onClick={InternsCompleteDetail} />
                       
                      </TableCell>
                    </TableRow>
                  );
                })
              : filteredData &&
                filteredData.map((row, index) => {
                  return (
                    <TableRow key={index} id={row.candidateDetails.basicDetails.email}>
                      <TableCell align="center">
                        <Avatar
                          src={
                            row.candidateDetails.attachments?.photoUrl ? (
                              row.candidateDetails.attachments?.photoUrl
                            ) : (
                              <PersonOutline />
                            )
                          }
                          style={{
                            width: 30,
                            height: 30,
                            margin: "0 auto",
                          }}
                          aria-label="profile image"
                        ></Avatar>
                      </TableCell>
                      <TableCell id="fullname" align="center">
                        {row.candidateDetails.basicDetails?.fullName}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.basicDetails?.email}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.domain
                          ? row.candidateDetails.internshipDetails.domain
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.startDate
                          ? row.candidateDetails.internshipDetails.startDate
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.internshipDetails?.endDate
                          ? row.candidateDetails.internshipDetails.endDate
                          : "--"}
                      </TableCell>
                      <TableCell align="center">
                        {row.candidateDetails.profileComplete
                          ? "Completed"
                          : "Incomplete"}
                      </TableCell>
                      <TableCell align="center">--</TableCell>
                      <TableCell align="center">--</TableCell>
                      <TableCell align="center" id={row.candidateDetails.basicDetails.email}>
                        <Button variant="contained" onClick={sendofferletter}  id={row.candidateDetails.basicDetails.email}>
                        Send
                        </Button>
                      </TableCell>
                      <TableCell align="center" id={row.candidateDetails.basicDetails.email}>
                      
                        <OpenInNewIcon color='primary' fontSize='small' onClick={InternsCompleteDetail} />
                       
                      </TableCell>
                    </TableRow>
                  );
                })}
}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={20}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
