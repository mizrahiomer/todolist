import React, { Component } from 'react';
import Task from './Task';

class Tasks extends Component {
    state = {
        newTask: '',
        tasks: [],
        show: 'all'
    }
    onChangeHandler = e => {
        console.log(e.target.value);
        this.setState({ newTask: e.target.value });
    }
    addTask = (event) => {
        event.preventDefault();
        const newTask = this.state.newTask;
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date = new Date().toLocaleDateString('en-US', options);
        const id = this.state.tasks.length + 1 + newTask;
        const task = { task: newTask, date: date, id: id, isComplete: false };
        this.setState({
            tasks: [...this.state.tasks, task],
            newTask: '',
        });
    }
    deleteTask = (id) => {
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.filter(task => task.id !== id)
            };
        })
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
        const tasks = filterTasks.map((task, i) => (
            <Task
                key={task.id}
                name={task.task}
                date={task.date}
                delete={() => this.deleteTask(task.id)}
                isComplete={task.isComplete}
                complete={() => this.completeTask(task.id)}
                dragStart={e => this.dragStart(e, i)}
                dragOver={() => this.dragOver(i)}
                dragEnd={this.dragEnd}
            >
            </Task>

        ));
        const btnCls = 'btn shadow btn-sm m-2 '
        return (
            <div className='container'>
                <form className='col-sm-8' onSubmit={this.addTask}>
                    <input placeholder='What needs to be done?' value={this.state.newTask} className='form-control shadow m-2 p-2' onChange={this.onChangeHandler} />
                </form>
                {this.state.tasks.length > 0 ?
                    <div className='container-fluid'>
                        <button className={btnCls + 'btn-secondary'} onClick={() => this.showAll()}>All</button>
                        <button className={btnCls + 'btn-danger'} onClick={() => this.showActive()}>Active</button>
                        <button className={btnCls + 'btn-success'} onClick={() => this.showCompleted()}>Completed</button>
                    </div> : null}
                <ul>
                    {tasks}
                </ul>
            </div>


        )

    }
}
export default Tasks;