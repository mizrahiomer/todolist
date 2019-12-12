import React from 'react';
import Reveal from 'react-reveal/Reveal';
import { Input, Icon } from 'semantic-ui-react';
import Fade from 'react-reveal/Fade';
import './Task.css';

const Task = props => {
  const completeBtn = props.isComplete
    ? 'check circle green big'
    : 'check circle outline big ';
  const completeTxt = props.isComplete ? 'complete' : 'd-inline';
  const taskContent = props.isEditing ? (
    <form onSubmit={props.editSubmit}>
      <Reveal>
        <Input
          required
          autoFocus
          type='text'
          value={props.contentEdit}
          onChange={props.onEdit}
          onBlur={props.editSubmit}
        />
      </Reveal>
    </form>
  ) : (
    <h2 className={completeTxt}>{props.content}</h2>
  );
  const editBtn = !props.isEditing ? (
    <Icon name='edit big' color='blue' onClick={props.edit} />
  ) : (
    <Icon name='check big' color='green' onClick={props.editSubmit} />
  );
  return (
    <Fade bottom>
      <li onDragOver={props.dragOver}>
        <div draggable onDragStart={props.dragStart} onDragEnd={props.dragEnd}>
          {!props.isEditing ? (
            <Icon className={completeBtn} onClick={props.complete}></Icon>
          ) : null}
          {taskContent}
          <p className='text-muted h6'>{props.date}</p>
          <div className='text-right'>
            <Icon name='trash big ' color='red' onClick={props.delete} />
            {editBtn}
          </div>
        </div>
      </li>
    </Fade>
  );
};
export default Task;
