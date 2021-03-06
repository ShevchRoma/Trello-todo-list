
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import List from './Components/List/List';
import AddList from './Components/AddButtonList/AddList';
import Tasks from './Components/Tasks/Tasks';
import EditTitleColon from './Components/Sidebar/EditTitleColon';


function App() {
  
  const [lists, setLists] = useState(null);
   const [colors, setColors] = useState(null);
   const [activeItem,setActiveItem] = useState(null);
  const [list,setList] = useState('null');

   useEffect(() => {
     axios
       .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
       .then(({ data }) => {
         setLists(data);
       });
     axios.get('http://localhost:3001/colors').then(({ data }) => {
       setColors(data);
     });
     axios.get('http://localhost:3001/title').then(({data}) =>{
       setList(data);
       
     });
   }, []);
  

  const onAddList = obj => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };
  const onRemoveTask = (listId,taskId) =>{
    if(window.confirm('Вы действительно хотите удалить?')){
      const newList = [...lists.map(item =>{
        if(item.id === listId){
            item.tasks = item.tasks.filter(task => task.id != taskId)
        }
        return item;
      })]
      setLists(newList);

       axios.delete('http://localhost:3001/tasks/' + taskId)
       .catch(()=>{
         alert('Не удалось обновить название списка');
       })
    }
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };
  const onEditTitleColon = (id,title) =>{
        const newList = list.map(item =>{
          if(item.id === id){
            item.name = title;
          }
          return item;
        });
        setList(newList);
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  


  
  return (
    <div className="trello">
      <div className="trello__sidebar1">
         <div className="trello__sidebar1__title">
             <EditTitleColon list={list} onEditTitleColon={onEditTitleColon}/>
         </div>
      
        
         
            {lists ? (
           <List
             items={lists}
             onRemove={id => {
               const newLists = lists.filter(item => item.id !== id);
               setLists(newLists);
             }}
             onClickItem = {item =>{
               setActiveItem(item);
             }}
             activeItem={activeItem}
             isRemovable
           />
         ) : (
           'Загрузка...'
         )}
         <AddList onAdd={onAddList} colors={colors} />
           </div>
           <div className="trello__tasks">{lists && activeItem && 
           <Tasks list={activeItem} onEditTask={onEditTask} onAddTask={onAddTask} onRemoveTask={onRemoveTask} onEditTitle={onEditListTitle}/>}</div>

      </div>
      
      
  );
}

export default App;
