import React from 'react';
import addSvg from '../../assets/img/add.svg';
import classNames from 'classnames';

import './List.css';
import Badge from '../Badge/Badge';
import removeSvg from '../../assets/img/remove.svg';
import axios from 'axios';

const List= ({items,isRemovable,onClick,onRemove,onClickItem,activeItem}) =>{

    const removeList = (item) =>{
        if (window.confirm('Вы действительно хотите удалить список?')){
            
                axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
         onRemove(item.id);
       });
            
        }
    };
    return <div className="list">
    <ul onClick={onClick}>
        {
           items.map((item,index) =>(
            <li key={index} className={classNames(item.className,
                {active: activeItem && activeItem.id === item.id})}
            onClick={onClickItem ? () =>onClickItem(item) : null} >

                <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>

                <span>{item.name}{item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}</span>
                {isRemovable && (
                <img className="list__remove-icon" src={removeSvg} alt="Remove icon"
                onClick={()=>removeList(item)} />
                )}
            </li>))
        }
        
      
    </ul>
    </div>
}
export default List;