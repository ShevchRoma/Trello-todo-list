import React from 'react'
import editSvg from './../../assets/img/edit.svg';
import deleteSvg from './../../assets/img/remove.svg';
import './TaskEdit.css';

const TaskEdit = ({id,text,onRemove,onEdit,list}) => {
    return (
        
            <div key={id} className="tasks__items-row">
             <div className="checkbox">
               <input id={`task-${id}`} type="checkbox" />
               <label htmlFor={`task-${id}`}>
                 <svg
                   width="11"
                   height="8"
                   viewBox="0 0 11 8"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                     stroke="#000"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                   />
                 </svg>
               </label>
             </div> 
        
        <p className="list-item">{text}</p>
        <div className="tasks__items-row-actions">
            <div onClick = {() =>{onRemove(list.id,id)}}>
            <img src={deleteSvg} alt="delete" />
            </div>
            <div onClick={() => onEdit(list.id,{id,text})}>
             <img src={editSvg} alt="Edit icon" />
             </div>
            
         
        </div>
        </div>
        
    )
}



export default TaskEdit;
