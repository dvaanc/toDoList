/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksR0FBRztBQUNmO0FBQ0E7QUFDQTs7O0FBR0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0EsQ0FBQzs7QUFFRCwyQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9mYWN0b3J5IGZ1bmMgdGhhdCBtYWtlcyB0by1kb3NcbmNvbnN0IHRvRG9GYWN0b3J5ID0gKGZ1bmN0aW9uKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQpIHtcbiAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbn0pKCk7XG5cblxuXG4vL2hvbGRzIGFsbCBkYXRhXG5jb25zdCBkYXRhQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IHRvRG9EYXRhID0gW107XG5cbiAgY29uc3QgcHVzaFRvRG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCkgPT4ge1xuICAgIGNvbnN0IHRvRG8gPSB0b0RvRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkKTtcbiAgICB0b0RvRGF0YS5wdXNoKHRvRG8pO1xuICB9XG5cbiAgcmV0dXJuIHsgcHVzaFRvRG8gfTtcbn0pKCk7XG5cbi8vcmVzcG9uc2libGUgZm9yIG1hbmlwdWxhdGluZyB0aGUgZG9tXG5jb25zdCBkb21TdHVmZiA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZVwiKTtcbiAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5XCIpO1xuICBjb25zdCB3ZWVrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgbWFpblBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXBhbmVsXCIpO1xuICBjb25zdCBuZXdUb2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdG9kb1wiKTtcbiAgY29uc3QgY2xvc2VOZXdUb0RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZS1uZXctdG9kb1wiKTtcblxuICBob21lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyQ29udGVudChcIkhvbWVcIik7XG4gIH0pO1xuXG4gIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgd2Vlay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIG5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICBtYWluUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjYWRkLXRhc2tcIikpIHtcbiAgICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcigpO1xuICAgIH1cbiAgfSk7XG5cbiAgbmV3VG9kb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQgPT09IG5ld1RvZG9Db250YWluZXIpIG5ld1RvZG9Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICB9KTtcblxuICBjbG9zZU5ld1RvRG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG5ld1RvZG9Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpKTtcblxuXG4gIGNvbnN0IGFwcGVuZFRvRG8gPSAoKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IHRyaWdnZXJNb2RhbENvbnRhaW5lciA9ICgpID0+IHtcbiAgICBuZXdUb2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29udGVudCA9IChoMikgPT4ge1xuICAgIG1haW5QYW5lbC5pbm5lckhUTUwgPSBgXG4gICAgICA8aDI+JHtoMn08L2gyPlxuICAgICAgPGRpdiBpZD1cImFkZC10YXNrXCIgY2xhc3M9XCJ0YXNrXCI+KyBBZGQgVGFzazwvZGl2PlxuICAgIGA7XG4gIH1cbiAgXG5cbn0pKCk7XG5cbi8vbWFnaWMgc3R1ZmYgaGFwcGVucyBoZXJlXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGFkZFRvRG8gPSAoKSA9PiB7XG5cbiAgfVxuXG5cbiAgcmV0dXJuIHt9XG59KSgpO1xuXG5jb25zb2xlLmxvZyhcImhlbGxvIHdvcmxkXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=