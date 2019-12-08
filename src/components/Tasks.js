import React, { Component } from 'react';
import Task from './Task';

class Tasks extends Component {
    state = {
        newTask: '',
        tasks: [],
        editTask: '',
        show: 'all',
        error: true
    }

    onChangeHandler = e => {
        this.setState({ newTask: e.target.value, error: e.target.value.length > 0 ? false : true });
    }
    onEditHandler = e => {
        console.log(e.target.value)
        this.setState({ editTask: e.target.value })
    }
    addTask = (event) => {
        event.preventDefault();
        const newTask = this.state.newTask;
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date = new Date().toLocaleDateString('en-US', options);
        const id = this.state.tasks.length + newTask + date;
        const task = { content: newTask, date: date, id: id, isComplete: false, isEditing: false };
        this.setState({
            tasks: [...this.state.tasks, task],
            newTask: '',
            show: 'all',
            error: true
        });
    }
    editTaskSubmit = (event, id) => {
        event.preventDefault();
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        const newTask = this.state.editTask;
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const newDate = new Date().toLocaleDateString('en-US', options);
        const newId = this.state.tasks.length + 1 + newTask + newDate;
        tasks[index].content = newTask;
        tasks[index].id = newId;
        tasks[index].date = newDate;
        tasks[index].isEditing = false;
        this.setState({ tasks: tasks })

    }
    deleteTask = (id) => {
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.filter(task => task.id !== id)
            };
        })
    }
    deleteAllTasks = () => {
        this.setState({ tasks: [] })
    }
    editTask = (id) => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        tasks[index].isEditing = !tasks[index].isEditing;
        this.setState({ tasks: tasks, editTask: tasks[index].content });
    }
    completeTask = (id) => {
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(task => task.id === id);
        tasks[index].isComplete = !tasks[index].isComplete;
        this.setState({ tasks: tasks });
    }
    dragStart = (e, index) => {
        this.draggedItem = this.state.tasks[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
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
    }
    showActive = () => {
        this.setState({ show: 'active' });
    }
    showAll = () => {
        this.setState({ show: 'all' });
    }
    render() {
        let filterTasks = null;
        switch (this.state.show) {
            case 'completed': filterTasks = this.state.tasks.filter(task => task.isComplete === true);
                break;
            case 'active': filterTasks = this.state.tasks.filter(task => task.isComplete === false);
                break;
            case 'all': filterTasks = [...this.state.tasks];
                break;
            default: return;
        }
        let tasks = null;
        if (filterTasks.length === 0) {
            tasks = <p>There are no todos yet</p>;
        } else {
            tasks = filterTasks.map((task, i) => (
                <Task
                    key={task.id}
                    content={task.content}
                    contentEdit={this.state.editTask}
                    date={task.date}
                    delete={() => this.deleteTask(task.id)}
                    edit={() => this.editTask(task.id)}
                    onEdit={(e) => this.onEditHandler(e)}
                    editSubmit={(e) => this.editTaskSubmit(e, task.id)}
                    isComplete={task.isComplete}
                    isEditing={task.isEditing}
                    complete={() => this.completeTask(task.id)}
                    dragStart={e => this.dragStart(e, i)}
                    dragOver={() => this.dragOver(i)}
                    dragEnd={this.dragEnd}
                >
                </Task>

            ));
        }
        return (
            <div className='container'>
                <form className='row' onSubmit={this.addTask}>
                    <input autoFocus type='text' placeholder='What needs to be done?' value={this.state.newTask} className='form-control d-inline col-sm-7 shadow m-2 p-2' onChange={this.onChangeHandler} />
                    <button disabled={this.state.error ? true : false} type='submit' className='btn text-primary shadow-none'><i className="fas fa-2x fa-plus"></i></button>
                    <button type='button' onClick={this.deleteAllTasks} disabled={this.state.tasks.length === 0 ? true : false} className='btn text-success shadow-none'><i class="fas fa-2x fa-trash-alt"></i></button>
                </form>
                {this.state.error ? <p className=' col-sm-2 text-danger'>Write Something...</p> : null}
                {/* <button className='btn btn-primary m-4' onClick={() => console.log(this.state)}></button> */}
                {this.state.tasks.length > 0 ?
                    <div className='container-fluid'>
                        <button className={this.state.show === 'all' ? ' btn btn-secondary m-2 btn-sm' : ' btn btn-outline-secondary m-2 btn-sm'} onClick={() => this.showAll()}>All</button>
                        <button className={this.state.show === 'active' ? ' btn btn-danger m-2 btn-sm' : ' btn btn-outline-danger m-2 btn-sm'} onClick={() => this.showActive()}>Active</button>
                        <button className={this.state.show === 'completed' ? ' btn btn-success m-2 btn-sm' : ' btn btn-outline-success m-2 btn-sm'} onClick={() => this.showCompleted()}>Completed</button>
                    </div> : null}
                <ul>
                    {tasks}
                </ul>

            </div>
        )

    }
}
export default Tasks;