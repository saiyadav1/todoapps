import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
function Todolist(props) {
    const {list,handledelete,handlecomplete }=props;
    // console.log(list)
   return (
        <div className='todo-list'>
  
                {
                list.map((ele,i)=>(
                  <div className='todo-child' key={i} id={i}>
                  <div className='todo-child-input'> <p >{ele['todotext']}</p></div>
                  <div className='todo-child-button'>
                  
                  <DeleteIcon onClick={handledelete}/> 
                
                  {ele['complete']?
                  (<CheckBoxIcon onClick={handlecomplete}/>):
                  (<CheckBoxOutlineBlankIcon onClick={handlecomplete}/>)
                }
                  </div>
                  </div>
               ))
               }
         
        </div>
    );
}

export default Todolist;