import React from 'react';
import cls from './Task.module.css';

const Task = (props) => {
    const border = props.isComplete ? 'border-success' : 'border-danger';
    const completeBtn = props.isComplete ? 'far fa-2x fa-check-circle text-success mx-2' : 'far fa-2x fa-circle mx-2';
    const completeTxt = props.isComplete ? cls.complete : 'd-inline'
    return (
        <li className={cls.task + ' col-sm-6 my-2'} onDragOver={props.dragOver}>
            <div className={'bg-light shadow p-2 border rounded ' + border} draggable onDragStart={props.dragStart} onDragEnd={props.dragEnd}>
                <i onClick={props.complete} className={completeBtn}></i>
                <h4 className={completeTxt}>{props.name}</h4>
                <p className='text-secondary'>{props.date}</p>
                <button className='btn btn-danger mx-1' onClick={props.delete}>Delete</button>
                <button className='btn btn-primary mx-1'>Edit</button>
            </div>
        </li>
    )
}
export default Task;