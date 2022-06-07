import * as React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from '@material-ui/core';
export default function ComboBox({filtervalueselected}) {
  return (
    
  <Autocomplete
  multiple
  
  id="combo-box-demo"
  options={filteroption}
  getOptionLabel={(option) => option.title} // <--
  style={{ width: 300 }}
  
  renderInput={(params) => <TextField {...params}  label="Filter" variant="outlined" />}
  // defaultValue={defaultoption.title}
    onChange={(event,value)=>{filtervalueselected(value)}}
/>
  );
}
const filteroption=[
    {title:'All',id:1},
    {title:'PS Complete',id:2},
    {title:'PS InComplete',id:3},
    {title:'Domain AI/ML',id:4},
    {title:'Domain Cloud',id:5},
    {title:'Domain Js',id:6},
    {title:'Domain Python',id:7}
]
// const defaultoption=[
//   {title:'All',id:1}
// ]

