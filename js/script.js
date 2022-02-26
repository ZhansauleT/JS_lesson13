//todo-control
//header-input
//todo-list
//todo-completed

const toDoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const toDoList = document.querySelector(".todo-list");
const toDoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const todoLoad = () => {
  let result = JSON.parse(localStorage.getItem('tasks'));

  if (!result) {
    result = [];
  }

  return result;
};


toDoData = todoLoad();


const render = function(){
  toDoList.innerHTML = '';
  toDoCompleted.innerHTML = '';

  toDoData.forEach(function(item){
    //todo-item
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">'+item.text+'</ span>'+ '<div class="todo-buttons">'+
					'<button class="todo-remove"></button>'+
					'<button class="todo-complete"></button>'+
				'</div>';

    if(item.completed){
      toDoCompleted.append(li);
    }else{
      toDoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function(){
      toDoData.splice(toDoData.indexOf(item), 1);
      render();
    });

  });

  localStorage.setItem("tasks", JSON.stringify(toDoData));
};

toDoControl.addEventListener('submit', function(event){
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false
  };

  if(!newToDo.text){
    alert('Ничего не введено!');
  }else{
    toDoData.push(newToDo);
  }

  headerInput.value = '';
  render();
});

render();
