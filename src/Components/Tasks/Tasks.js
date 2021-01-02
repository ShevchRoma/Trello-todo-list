import React from 'react'

import './Tasks.css';
import editSvg from '../../assets/img/edit.svg';
import axios from 'axios';
import addSvg from './../../assets/img/add.svg';
import AddTaskForm from './AddTaskForm';
import TaskEdit from './TaskEdit';


 const Tasks = ({list,onEditTitle,onAddTask,onRemoveTask,onEditTask}) => {

  const editTitle = () =>{
    const newTitle = window.prompt('Название списка',list.name);
    if(newTitle){
       onEditTitle(list.id, newTitle);
       axios.patch('http://localhost:3001/lists/' + list.id, {
         name: newTitle
       }).catch(() =>{
         alert('Не удалось обновить название списка')
       });
    }
  }

  
    return (
    <div>
        <div className="tasks">
             <h2 className="tasks__title">
               {list.name}
             <img onClick={editTitle} src ={editSvg} alt="Edit icon" />
             </h2>
             <div className="tasks__items">
               {list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                
                 {list.tasks.map(task => (
           <TaskEdit key={list.id}
           list={list}
           onEdit={onEditTask}
           onRemove={onRemoveTask}
           
           {...task}/>
                 ))}
                 <AddTaskForm onAddTask={onAddTask} list={list} />
                 
                 </div>

               
             
             </div>
             </div>
    )
}
          

export default Tasks;
