import React, { Component, Fragment } from 'react';
import { Icon, Input, Button, Grid, Container } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import Fade from 'react-reveal/Fade';
import Task from './Task';
import './Tasks.css';

class Tasks extends Component {
  state = {
    newTask: '',
    tasks: [],
    editTask: '',
    show: 'all'
  };
  onChangeHandler = e => {
    this.setState({ newTask: e.target.value });
  };
  onEditHandler = e => {
    console.log(e.target.value);
    this.setState({ editTask: e.target.value });
  };
  addTask = event => {
    event.preventDefault();
    const newTask = this.state.newTask;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const date = new Date().toLocaleDateString('en-US', options);
    const id = this.state.tasks.length + newTask + date;
    const task = {
      content: newTask,
      date: date,
      id: id,
      isComplete: false,
      isEditing: false
    };
    this.setState({
      tasks: [...this.state.tasks, task],
      newTask: '',
      show: 'all'
    });
  };
  editTaskSubmit = (event, id) => {
    event.preventDefault();
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    const newTask = this.state.editTask;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const newDate = new Date().toLocaleDateString('en-US', options);
    const newId = this.state.tasks.length + 1 + newTask + newDate;
    tasks[index].content = newTask;
    tasks[index].id = newId;
    tasks[index].date = newDate;
    tasks[index].isEditing = false;
    this.setState({ tasks: tasks });
  };
  deleteTask = id => {
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => task.id !== id)
      };
    });
  };
  deleteAllTasks = () => {
    this.setState({ tasks: [] });
  };
  editTask = id => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks[index].isEditing = !tasks[index].isEditing;
    this.setState({ tasks: tasks, editTask: tasks[index].content });
  };
  completeTask = id => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks[index].isComplete = !tasks[index].isComplete;
    this.setState({ tasks: tasks });
  };
  dragStart = (e, index) => {
    this.draggedItem = this.state.tasks[index];
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  dragOver = index => {
    const draggedOverItem = this.state.tasks[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    let tasks = this.state.tasks.filter(task => task !== this.draggedItem);
    tasks.splice(index, 0, this.draggedItem);
    this.setState({ tasks: tasks });
  };
  dragEnd = () => {
    this.draggedIdx = null;
  };
  showCompleted = () => {
    this.setState({ show: 'completed' });
  };
  showActive = () => {
    this.setState({ show: 'active' });
  };
  showAll = () => {
    this.setState({ show: 'all' });
  };
  render() {
    let filterTasks = null;
    switch (this.state.show) {
      case 'completed':
        filterTasks = this.state.tasks.filter(task => task.isComplete === true);
        break;
      case 'active':
        filterTasks = this.state.tasks.filter(
          task => task.isComplete === false
        );
        break;
      case 'all':
        filterTasks = [...this.state.tasks];
        break;
      default:
        return;
    }
    let tasks = null;
    filterTasks.length === 0
      ? (tasks = <h4 className='mt-1'>There are no todos yet</h4>)
      : (tasks = filterTasks.map((task, i) => (
          <Task
            key={task.id}
            content={task.content}
            contentEdit={this.state.editTask}
            date={task.date}
            delete={() => this.deleteTask(task.id)}
            edit={() => this.editTask(task.id)}
            onEdit={e => this.onEditHandler(e)}
            editSubmit={e => this.editTaskSubmit(e, task.id)}
            isComplete={task.isComplete}
            isEditing={task.isEditing}
            complete={() => this.completeTask(task.id)}
            dragStart={e => this.dragStart(e, i)}
            dragOver={() => this.dragOver(i)}
            dragEnd={this.dragEnd}
          ></Task>
        )));
    return (
      <Fragment>
        <Fade top>
          <form onSubmit={this.addTask}>
            <Input
              required
              autoFocus
              type='text'
              value={this.state.newTask}
              onChange={this.onChangeHandler}
              placeholder='What needs to be done?'
            />
            <Icon
              name='plus'
              size='huge'
              color='blue'
              disabled={this.state.newTask.length === 0 ? true : false}
              onClick={this.addTask}
              data-tip='Add new todo'
            />
            <ReactTooltip
              place='bottom'
              type='light'
              effect='solid'
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
            <Icon
              name='trash'
              size='huge'
              color='green'
              disabled={this.state.tasks.length === 0 ? true : false}
              onClick={this.deleteAllTasks}
              data-tip='Delete All'
            />
            <ReactTooltip
              place='bottom'
              type='light'
              effect='solid'
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
          </form>
        </Fade>
        {/* <button className='btn btn-primary m-4' onClick={() => console.log(this.state)}></button> */}
        {this.state.tasks.length > 0 ? (
          <Fade top>
            <Container>
              <Grid.Row>
                <Button
                  basic={this.state.show === 'all' ? false : true}
                  color='black'
                  onClick={() => this.showAll()}
                >
                  All
                </Button>
                <Button
                  basic={this.state.show === 'active' ? false : true}
                  color='red'
                  onClick={() => this.showActive()}
                >
                  Active
                </Button>
                <Button
                  basic={this.state.show === 'completed' ? false : true}
                  color='green'
                  onClick={() => this.showCompleted()}
                >
                  Completed
                </Button>
              </Grid.Row>
            </Container>
          </Fade>
        ) : null}
        <ul>{tasks}</ul>
      </Fragment>
    );
  }
}
export default Tasks;
