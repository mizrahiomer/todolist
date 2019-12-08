import React from 'react';
import cls from './Task.module.css';

const Task = (props) => {
    const border = props.isComplete ? 'border-success' : 'border-danger';
    const completeBtn = props.isComplete ? 'far fa-2x fa-check-circle text-success mx-2' : 'far fa-2x fa-circle mx-2';
    const completeTxt = props.isComplete ? cls.complete : 'd-inline'
    const taskContent = props.isEditing ?
        <form onSubmit={props.editSubmit}>
            <input autoFocus type='text' value={props.contentEdit} className='d-inline form-control p-2' onChange={props.onEdit} onBlur={props.editSubmit} />
        </form>
        : <h2 className={completeTxt}>{props.content}</h2>;
    const editBtn = !props.isEditing ?
        <button className='btn btn-primary mx-1' onClick={props.edit}><i className="fas fa-edit"></i></button> :
        <button className='btn btn-success mx-1' onClick={props.editSubmit}><i className="fas fa-check"></i></button>
    return (
        <li className={cls.task + ' card p-2 m-2 col-sm-6 border ' + border} onDragOver={props.dragOver}>
            <div draggable onDragStart={props.dragStart} onDragEnd={props.dragEnd}>
                {!props.isEditing ? <i onClick={props.complete} className={completeBtn}></i> : null}
                {taskContent}
                <p className='text-muted h6'>{props.date}</p>
                <div className='text-right'>
                    <button className='btn btn-danger mx-1' onClick={props.delete}><i className="fas fa-trash-alt"></i></button>
                    {editBtn}
                </div>
            </div>
        </li>
    )
}
export default Task;