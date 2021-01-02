 import React,{useState} from 'react';
 import addSvg from './../../assets/img/add.svg';
 import './Tasks.css';
 import axios from 'axios';
 
 const AddTaskForm = ({list,onAddTask}) => {
     const [visibleForm,setFormVisible] = useState(false);
     const [inputValue,setInputValue] = useState('');

     const toggleFormVisible = () =>{
           setFormVisible(!visibleForm);
           setInputValue('');
     };
     const addTask = () =>{
         const obj ={
            
            "listId": list.id,
            "text": inputValue,
            "completed": false
             };
        axios.post('http://localhost:3001/tasks',obj)
        .then(({data}) =>{
              
         onAddTask(list.id,obj);
         toggleFormVisible();
        });
     }

    return (
        <div>
            <div className="tasks__form">
                {!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
                      <img src={addSvg} alt="Add icon" />
                      <span>Новая задача</span>
                   </div> :
                   <div className="tasks__form-block">
                       <input value={inputValue} className="field" 
                       placeholder="Название задачи"
                       onChange={e => setInputValue(e.target.value)}></input>
                       <button onClick={addTask}  className="button">
                       Добавить
                       </button>
                       <button onClick={toggleFormVisible} className="button button--grey" >
                       Отмена
                       </button>
                   </div> }
                 </div>
        </div>
    )
}


export default AddTaskForm;
