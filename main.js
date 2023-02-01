let btnAdd = document.querySelector('button');
let taskElement = document.querySelector('#write-content')
let tasks =  getTaskFromLocalStorage();
let _error = document.querySelector('#error-empty');

renderTasks(tasks)

btnAdd.addEventListener('click',function(){
    if (!taskElement.value){
        if( _error.classList.contains('notify'))
            _error.classList.remove('notify');
        _error.style.display = 'block';

        setInterval(() => {
            _error.classList.add('notify');
        }, 1500);
        return false;
    }
    let taskId = this.getAttribute('id');
    let task = { name: taskElement.value,
                 status: 'unDone' } ;
    let tasks =  getTaskFromLocalStorage();

    if(taskId === 0 || taskId){
        tasks[taskId] = task;
        this.removeAttribute('id'); 
        btnAdd.innerHTML='ADD'
    }
    else
        tasks.push(task)
    
    taskElement.value='';
    

    localStorage.setItem('tasks',JSON.stringify(tasks));
    renderTasks(tasks);
})

//edit takss
function editTasks(id){
    let tasks = getTaskFromLocalStorage();
    if(tasks.length > 0){
        taskElement.value = tasks[id].name;
        btnAdd.setAttribute('id',id);
        btnAdd.innerHTML='EDIT';
    }
}

//delete tasks
function deleteTasks(id){
    let tasksDel = getTaskFromLocalStorage();
    tasksDel.splice(id,1)
    localStorage.setItem('tasks',JSON.stringify(tasksDel));
    renderTasks(getTaskFromLocalStorage());
}

//mark completed tasks
function markCompletedTasks(id){
    // let tasksMark = getTaskFromLocalStorage();
    let todoItem = document.querySelectorAll('.todo-item');
    let markColor = document.querySelectorAll('.mark-todo');
    let mark = true;
    // let isCompleted = true;
    todoItem[id].classList.toggle('lineThrough');
    if(todoItem[id].classList.contains('lineThrough')){
        markColor[id].style.backgroundColor = 'green';
    }
    else {
        markColor[id].style.backgroundColor = 'red';
    }
    // isCompleted ? markColor[id].style.backgroundColor = 'green': markColor[id].style.backgroundColor = 'red';
}


//click on Done
function displayDone(tasks=[]){
    let tasksDone = getTaskFromLocalStorage();
    let done = document.querySelector('#done-todo');
    let unDone = document.querySelector('#unDone-todo');
    let all = document.querySelector('#all-todo');

    done.classList.add('backgroundClick');
    unDone.classList.remove('backgroundClick');
    all.classList.remove('backgroundClick');
    if(tasksDone.length > 0 ){
        let Items = document.getElementsByClassName('todo-item');
        for(let i=0; i<tasksDone.length;i++)
        {
            for(let j =0; j < Items.length; j++){
                if (Items[j].classList.contains('lineThrough')==false){
                    Items[j].classList.add('displayNone')
                }
                else Items[j].classList.remove('displayNone');
            }
        }
    }
    else {
        return false;
    }
}

//click on UnDone
function displayUndone(tasks=[]){
    let tasksUndone = getTaskFromLocalStorage();
    let done = document.querySelector('#done-todo');
    let unDone = document.querySelector('#unDone-todo');
    let all = document.querySelector('#all-todo');

    done.classList.remove('backgroundClick');
    unDone.classList.add('backgroundClick');
    all.classList.remove('backgroundClick');

    if(tasksUndone.length > 0 ){
        let Items = document.getElementsByClassName('todo-item');
        for(let i=0; i<tasksUndone.length;i++)
        {
            for(let j =0; j < Items.length; j++){
                if (Items[j].classList.contains('lineThrough')==true){
                    Items[j].classList.add('displayNone');
                }
                else Items[j].classList.remove('displayNone');
            }
        }
    }
    else {
        return false;
    }
}

//click on All
function displayAll(tasks=[]){
    let tasksUndone = getTaskFromLocalStorage();
    let done = document.querySelector('#done-todo');
    let unDone = document.querySelector('#unDone-todo');
    let all = document.querySelector('#all-todo');

    done.classList.remove('backgroundClick');
    unDone.classList.remove('backgroundClick');
    all.classList.add('backgroundClick');

    if(tasksUndone.length > 0 ){
        let Items = document.getElementsByClassName('todo-item');
        for(let i=0; i<tasksUndone.length;i++)
        {
            for(let j =0; j < Items.length; j++){
                Items[j].classList.remove('displayNone');
            }
        }
    }
    else {
        return false;
    }
}

// click xmark on empty-errors
function turnOffNotify(_error){
    _error.classList.add('notify');
}

//display the task
function renderTasks(tasks =[]){
    let content ='<ul>';
    tasks.forEach((tasks,index)=>{
        content +=`<li class="todo-item">
                        <div class="mark-todo"></div>
                        <p class="content-todo" onclick="markCompletedTasks(${index})">${tasks.name}</p>
                        <div>
                            <svg class="trash-can" onclick="deleteTasks(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            <svg class="pen-to-square" onclick="editTasks(${index})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                            
                        </div>
                    </li>`
    })
    content += '</ul>';
    document.querySelector('#list-todo').innerHTML=content;
}

function getTaskFromLocalStorage(){
   return localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')) :[];
}