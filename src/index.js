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
  const home = document.querySelector("#home");
  const today = document.querySelector("#today");
  const week = document.querySelector("#week");
  const newProject = document.querySelector("#new-project");
  const mainPanel = document.querySelector(".main-panel");
  const newTodoContainer = document.querySelector(".new-todo");
  const closeNewToDo = document.querySelector(".close-new-todo");

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
      triggerModalContainer();
    }
  });

  newTodoContainer.addEventListener("click", (e) => {
    if (e.target === newTodoContainer) newTodoContainer.classList.remove('show');
  });

  closeNewToDo.addEventListener("click", () => newTodoContainer.classList.remove('show'));


  const appendToDo = () => {

  }

  const triggerModalContainer = () => {
    newTodoContainer.classList.add("show");
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

console.log("hello world");