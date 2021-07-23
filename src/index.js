//factory func that makes to-dos
const toDoFactory = (function(title, description, dueDate, priority, checked) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.checked = checked;
})();



//holds all data
const dataBase = (function() {
  let toDoData = [];

  const pushToDo = (title, description, dueDate, priority, checked) => {
    const toDo = toDoFactory(title, description, dueDate, priority, checked);
    toDoData.push(toDo);
  }

  return { pushToDo };
})();

//responsible for manipulating the dom
const domStuff = (function() {
  //main page query selectors
  const home = document.querySelector("#home");
  const today = document.querySelector("#today");
  const week = document.querySelector("#week");
  const newProject = document.querySelector("#new-project");
  const mainPanel = document.querySelector(".main-panel");

  //add task query selectors
  const newTaskContainer = document.querySelector(".new-task");

  newTaskContainer.addEventListener("click", (e) => {
    if (e.target === newTaskContainer) newTaskContainer.classList.remove('show');
  });

  const closeNewTask = document.querySelector(".close-new-task").addEventListener("click", () => {
    newTaskContainer.classList.remove('show');
  });

  const newTaskForm = document.querySelector("#new-task").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#project").value;
    console.log(taskTitle, description, dueDate, priority, project);
    return false;
  })


  //main page event listeners
  home.addEventListener("click", () => {
    renderContent("Home");
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  newProject.addEventListener("click", () => {

  });

  mainPanel.addEventListener("click", e => {
    if(e.target.matches("#add-task")) {
      triggerModalContainer(newTaskContainer);
    }
  });

  
  

  const triggerModalContainer = modal => {
    modal.classList.add("show");
  }

  const appendToDo = () => {

  }

  

  const renderContent = (h2) => {
    mainPanel.innerHTML = `
      <h2>${h2}</h2>
      <div id="add-task" class="task">+ Add Task</div>
    `;
  }
  

})();

//magic stuff happens here
const app = (function() {
  const addToDo = () => {

  }


  return {}
})();
