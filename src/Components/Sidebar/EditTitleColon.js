import React from 'react';
import './Sidebar.css';
import editSvg from './../../assets/img/edit.svg';
import axios from 'axios';


 const EditTitleColon = ({list,onEditTitleColon}) => {
  
    const editColon =() =>{
      const newTitle = window.prompt("Название колонки",list.name);
      if(newTitle){
          onEditTitleColon(list.id,newTitle);
          
       axios.patch('http://localhost:3001/title/' + list.name, {
         name: newTitle
       }).catch(() =>{
         alert('Не удалось обновить название списка');
       });
    }
  }  
     




    return (
        <div>
            
            <img onClick={editColon} src={editSvg} alt="Edit-icon" />
            {list.name}К Новому Году
           
            
        </div>
    )
}
export default EditTitleColon;
