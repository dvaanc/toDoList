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

  home.addEventListener("click", () => {

  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  newProject.addEventListener("click", () => {

  });


  

})();

//magic stuff happens here
const app = (function() {

})();