import { Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { DataContext } from "../Context/DataContext";
import DataTable from "./common/DataTable";

function SignedupInterns() {
  const { candidatesData } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [isvalueselected,setisvalueselected]=useState(true);



const filtervalueselected=(values)=>{
setisvalueselected(false)  
let data=[...candidatesData];

values.map((value)=>{
  
  if(value.title=='PS Complete'){
    let uniq=[];
    let uniq2=[];
    candidatesData.map((row)=>{
        if(row.candidateDetails.profileComplete){
          uniq.push(row)
        }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
  if(value.title=='PS InComplete'){
    let uniq=[];
    let uniq2=[];
    candidatesData.map((row)=>{
        if(!row.candidateDetails.profileComplete){
          uniq.push(row)
        }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
  if(value.title=='Domain AI/ML'){
    let uniq=[];
    let uniq2=[];
            candidatesData.map((row)=>{
            const verify=row.candidateDetails.internshipDetails?.domain
            ? row.candidateDetails.internshipDetails.domain
            : "--";
            if(verify=='AI/Machine Learning'){
                    uniq.push(row)
              }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
  if(value.title=='Domain Js'){
    let uniq=[];
    let uniq2=[];
            candidatesData.map((row)=>{
            const verify=row.candidateDetails.internshipDetails?.domain
            ? row.candidateDetails.internshipDetails.domain
            : "--";
            if(verify=='Javascript'){
                    uniq.push(row)
              }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
  if(value.title=='Domain Cloud'){
    let uniq=[];
    let uniq2=[];
            candidatesData.map((row)=>{
            const verify=row.candidateDetails.internshipDetails?.domain
            ? row.candidateDetails.internshipDetails.domain
            : "--";
            if(verify=='Cloud'){
                    uniq.push(row)
              }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
  if(value.title=='Domain Python'){
    let uniq=[];
    let uniq2=[];
            candidatesData.map((row)=>{
            const verify=row.candidateDetails.internshipDetails?.domain
            ? row.candidateDetails.internshipDetails.domain
            : "--";
            if(verify=='Python'){
                    uniq.push(row)
              }
    })
    data.map((row)=>{
      uniq.map((row1)=>{
        if(row.candidateDetails.basicDetails.fullName==row1.candidateDetails.basicDetails.fullName)
        uniq2.push(row);
      })
    }) 
  data=[...uniq2];
  }
})
setFilteredData([...data])
}
  return (
    <>
   
      <Typography variant="h1" style={{ marginBottom: "20px" }}>
        Signed-up Interns
      </Typography>
      <DataTable candidatesData={candidatesData} filteredData={filteredData} filtervalueselected={filtervalueselected} isvalueselected={isvalueselected}/>
    </>
  );
}

export default SignedupInterns;
