(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{10:function(e,t,a){e.exports=a(15)},15:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(9),o=a.n(r),c=a(1),l=a(2),i=a(4),d=a(3),u=a(5),m=a(6),f=a(7),h=a.n(f),g=function(e){var t=e.isComplete?"border-success":"border-danger",a=e.isComplete?"far fa-2x fa-check-circle text-success mx-2":"far fa-2x fa-circle mx-2",n=e.isComplete?h.a.complete:"d-inline";return s.a.createElement("li",{className:h.a.task+" col-sm-6 my-2",onDragOver:e.dragOver},s.a.createElement("div",{className:"bg-light shadow p-2 border rounded "+t,draggable:!0,onDragStart:e.dragStart,onDragEnd:e.dragEnd},s.a.createElement("i",{onClick:e.complete,className:a}),s.a.createElement("h4",{className:n},e.name),s.a.createElement("p",{className:"text-secondary"},e.date),s.a.createElement("button",{className:"btn btn-danger mx-1",onClick:e.delete},"Delete"),s.a.createElement("button",{className:"btn btn-primary mx-1"},"Edit")))},k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).state={newTask:"",tasks:[],show:"all"},a.onChangeHandler=function(e){console.log(e.target.value),a.setState({newTask:e.target.value})},a.addTask=function(e){e.preventDefault();var t=a.state.newTask,n={task:t,date:(new Date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"}),id:a.state.tasks.length+1+t,isComplete:!1};a.setState({tasks:[].concat(Object(m.a)(a.state.tasks),[n]),newTask:""})},a.deleteTask=function(e){a.setState((function(t){return{tasks:t.tasks.filter((function(t){return t.id!==e}))}}))},a.completeTask=function(e){var t=Object(m.a)(a.state.tasks),n=t.findIndex((function(t){return t.id===e}));t[n].isComplete=!t[n].isComplete,a.setState({tasks:t})},a.dragStart=function(e,t){a.draggedItem=a.state.tasks[t],e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/html",e.target.parentNode),e.dataTransfer.setDragImage(e.target.parentNode,20,20)},a.dragOver=function(e){var t=a.state.tasks[e];if(a.draggedItem!==t){var n=a.state.tasks.filter((function(e){return e!==a.draggedItem}));n.splice(e,0,a.draggedItem),a.setState({tasks:n})}},a.dragEnd=function(){a.draggedIdx=null},a.showCompleted=function(){a.setState({show:"completed"})},a.showActive=function(){a.setState({show:"active"})},a.showAll=function(){a.setState({show:"all"})},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=null;switch(this.state.show){case"completed":t=this.state.tasks.filter((function(e){return!0===e.isComplete}));break;case"active":t=this.state.tasks.filter((function(e){return!1===e.isComplete}));break;case"all":t=Object(m.a)(this.state.tasks);break;default:return}var a=t.map((function(t,a){return s.a.createElement(g,{key:t.id,name:t.task,date:t.date,delete:function(){return e.deleteTask(t.id)},isComplete:t.isComplete,complete:function(){return e.completeTask(t.id)},dragStart:function(t){return e.dragStart(t,a)},dragOver:function(){return e.dragOver(a)},dragEnd:e.dragEnd})})),n="btn shadow btn-sm m-2 ";return s.a.createElement("div",{className:"container"},s.a.createElement("form",{className:"col-sm-8",onSubmit:this.addTask},s.a.createElement("input",{placeholder:"What needs to be done?",value:this.state.newTask,className:"form-control shadow m-2 p-2",onChange:this.onChangeHandler})),this.state.tasks.length>0?s.a.createElement("div",{className:"container-fluid"},s.a.createElement("button",{className:n+"btn-secondary",onClick:function(){return e.showAll()}},"All"),s.a.createElement("button",{className:n+"btn-danger",onClick:function(){return e.showActive()}},"Active"),s.a.createElement("button",{className:n+"btn-success",onClick:function(){return e.showCompleted()}},"Completed")):null,s.a.createElement("ul",null,a))}}]),t}(n.Component),p=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement(k,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t,a){e.exports={task:"Task_task__A1WjP",complete:"Task_complete__1BZYy"}}},[[10,1,2]]]);
//# sourceMappingURL=main.471721e1.chunk.js.map