/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//factory func that makes to-dos
const taskFactory = (title, description, dueDate, priority, checked, project) => {
  const task = {
    title, 
    description, 
    dueDate, 
    priority, 
    checked,
    project
  }

  return task;
};

const projectFactory = (name) => {
  this.name = name;
}



//holds all data
const dataBase = (function() {
  let taskData = [];
  let projectData = [];

  const pushTask = (title, description, dueDate, priority, checked, project) => {
    const newTask = taskFactory(title, description, dueDate, priority, checked, project);
    taskData.push(newTask);
  }

  const pushProject = (name) => {
    const project = projectFactory(name);
    projectData.push(project);
  }


  return { pushTask, pushProject, taskData };
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
    app.pushContent(taskTitle, description, dueDate, priority, project);

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

  const renderTask = (taskTitle, description, dueDate, priority, project) => {
    const task = document.createElement("div")
    task.classList.add("task");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const p = document.createElement("p");
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
  const pushContent = (taskTitle, description, dueDate, priority, project) => {
    dataBase.pushTask(taskTitle, description, dueDate, priority, project);
    console.log(dataBase.taskData);
  }


  return { pushContent }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLFNBQVM7QUFDWDs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7OztBQUtIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxZQUFZLEdBQUc7QUFDZjtBQUNBO0FBQ0E7OztBQUdBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxVQUFVO0FBQ1YsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9mYWN0b3J5IGZ1bmMgdGhhdCBtYWtlcyB0by1kb3NcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIHByb2plY3QpID0+IHtcbiAgY29uc3QgdGFzayA9IHtcbiAgICB0aXRsZSwgXG4gICAgZGVzY3JpcHRpb24sIFxuICAgIGR1ZURhdGUsIFxuICAgIHByaW9yaXR5LCBcbiAgICBjaGVja2VkLFxuICAgIHByb2plY3RcbiAgfVxuXG4gIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgbmV3VGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2gobmV3VGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KG5hbWUpO1xuICAgIHByb2plY3REYXRhLnB1c2gocHJvamVjdCk7XG4gIH1cblxuXG4gIHJldHVybiB7IHB1c2hUYXNrLCBwdXNoUHJvamVjdCwgdGFza0RhdGEgfTtcbn0pKCk7XG5cbi8vcmVzcG9uc2libGUgZm9yIG1hbmlwdWxhdGluZyB0aGUgZG9tXG5jb25zdCBkb21TdHVmZiA9IChmdW5jdGlvbigpIHtcbiAgLy9tYWluIHBhZ2UgcXVlcnkgc2VsZWN0b3JzXG4gIGNvbnN0IGhvbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvbWVcIik7XG4gIGNvbnN0IHRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RheVwiKTtcbiAgY29uc3Qgd2VlayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla1wiKTtcbiAgY29uc3QgbmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXByb2plY3RcIik7XG4gIGNvbnN0IG1haW5QYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1wYW5lbFwiKTtcblxuICAvL2FkZCB0YXNrIHF1ZXJ5IHNlbGVjdG9yc1xuICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFza1wiKTtcblxuICBuZXdUYXNrQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldCA9PT0gbmV3VGFza0NvbnRhaW5lcikgbmV3VGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIH0pO1xuXG4gIGNvbnN0IGNsb3NlTmV3VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtbmV3LXRhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIikudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFwiKS52YWx1ZTtcbiAgICBjb25zb2xlLmxvZyh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgYXBwLnB1c2hDb250ZW50KHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcblxuICB9KVxuXG5cbiAgLy9tYWluIHBhZ2UgZXZlbnQgbGlzdGVuZXJzXG4gIGhvbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJDb250ZW50KFwiSG9tZVwiKTtcbiAgfSk7XG5cbiAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICB3ZWVrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgbmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIG1haW5QYW5lbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIiNhZGQtdGFza1wiKSkge1xuICAgICAgdHJpZ2dlck1vZGFsQ29udGFpbmVyKG5ld1Rhc2tDb250YWluZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgXG4gIFxuXG4gIGNvbnN0IHRyaWdnZXJNb2RhbENvbnRhaW5lciA9IG1vZGFsID0+IHtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgfVxuXG4gIGNvbnN0IHJlbmRlclRhc2sgPSAodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIH1cblxuICBcblxuICBjb25zdCByZW5kZXJDb250ZW50ID0gKGgyKSA9PiB7XG4gICAgbWFpblBhbmVsLmlubmVySFRNTCA9IGBcbiAgICAgIDxoMj4ke2gyfTwvaDI+XG4gICAgICA8ZGl2IGlkPVwiYWRkLXRhc2tcIiBjbGFzcz1cInRhc2tcIj4rIEFkZCBUYXNrPC9kaXY+XG4gICAgYDtcbiAgfVxuICBcblxufSkoKTtcblxuLy9tYWdpYyBzdHVmZiBoYXBwZW5zIGhlcmVcbmNvbnN0IGFwcCA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgcHVzaENvbnRlbnQgPSAodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBkYXRhQmFzZS5wdXNoVGFzayh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgY29uc29sZS5sb2coZGF0YUJhc2UudGFza0RhdGEpO1xuICB9XG5cblxuICByZXR1cm4geyBwdXNoQ29udGVudCB9XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==