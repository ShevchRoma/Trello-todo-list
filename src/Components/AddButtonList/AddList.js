import React,{useState,useEffect} from 'react';
import List from '../List/List';
import Badge from '../Badge/Badge';

import closeSvg from '../../assets/img/close.svg';

import './AddList.css';
import axios from 'axios';

const AddList = ({colors,onAdd}) =>{
    const [visiblePopup,setVisiblePopup] = useState(false);
    const [selectedColor,selectColor] = useState(3);
    const[isLoading,setIsLoading] = useState(false);
    const[inputValue,setInputValue] = useState('');

    useEffect(() => {
        if(Array.isArray(colors)){
        selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () =>{
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };
    const addList = () =>{
        if(!inputValue){
            alert('Введите название списка')
            return;
        }
        
        setIsLoading(true);
     axios
       .post('http://localhost:3001/lists', {
         name: inputValue,
         colorId: selectedColor
       })
       .then(({ data }) => {
         const color = colors.filter(c => c.id === selectedColor)[0].name;
         const listObj = { ...data, color: { name: color } };
         onAdd(listObj);
         onClose();
       })
       .finally(() => {
         setIsLoading(false);
       });
   };
    

    return <div className="add-list">
        
    <List
     onClick={()=> setVisiblePopup(true)}
    items ={[{
        className: 'list__add-button',
               icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M8 1V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M1 8H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
               ,
               name:'Добавить'
      }]} />
   {visiblePopup && (
     <div className="add-list_popup">
       <img 
        
       onClick ={onClose}
       src={closeSvg} alt="" className="add-list__popup-close-btn" />
       <input value = {inputValue} 
       onChange = {e => setInputValue(e.target.value) } className="field" type="text" placeholder="Название карточки"/>
       <div className ="add-list__poup-colors">
           <ul>
               <li>
                   {
                   colors.map(color =>(
                           <Badge onClick= {()=>{selectColor(color.id)}} key={color.id}
                            color={color.name}
                            className={selectedColor === color.id && 'active'} />
                       ))
                        }
               </li>
               <li></li>
           </ul>
           </div>

       <button onClick={addList} className="button">
                     {isLoading ? 'Добавление...' : '+'}
       </button>
        
   </div> 
   )}
   
</div>

           
}
export default AddList;