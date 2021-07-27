/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//factory func that makes to-dos
const taskFactory = (title, description, dueDate, priority, project) => {
  const task = {
    title,
    description, 
    dueDate, 
    priority, 
    project
  }

  return task;
};

const projectFactory = (name) => {
  return name;
}



//holds all data
const dataBase = (function() {
  let taskData = [];
  let projectData = [];

  const pushTask = (title, description, dueDate, priority, project) => {
    const task = taskFactory(title, description, dueDate, priority, project);
    taskData.push(task);
  }

  const pushProject = (name) => {
    const project = projectFactory(name);
    projectData.push(project);
  }

  const deleteTask = (index) => {
    taskData.splice(index, 1);
  }

  return { pushTask, pushProject, taskData , deleteTask};
})();

//responsible for manipulating the dom
const domStuff = (function() {
  //main page query selectors
  const home = document.querySelector("#home");
  const today = document.querySelector("#today");
  const week = document.querySelector("#week");
  const newProject = document.querySelector("#new-project");
  const taskContainer = document.querySelector(".task-container");
  const mainPanel = document.querySelector(".main-panel");
  const newTaskModal = document.querySelector(".new-task");

  //add task query selectors
  newTaskModal.addEventListener("click", (e) => {
    if (e.target === newTaskModal) newTaskModal.classList.remove("show");
    if (e.target.matches(".close-new-task")) newTaskModal.classList.remove("show");
  });

  //main page event listeners
  home.addEventListener("click", () => {
    render("Home");
    clearContent();
    app.loopTaskData();
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  newProject.addEventListener("click", () => {

  });

  taskContainer.addEventListener("click", e => {
    if(e.target.matches('#delete-task')) {
      const taskIndex = e.target.parentNode.parentNode.dataset.index;
      dataBase.deleteTask(taskIndex)
      e.target.parentNode.parentNode.remove();
    }
  });

  mainPanel.addEventListener("click", e => {
    if(e.target.matches("#add-task")) {
      triggerModalContainer(newTaskModal);
    };
  })

  const newTaskForm = document.querySelector("#new-task").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#project").value;
    app.logic(taskTitle, description, dueDate, priority, project);
    newTaskModal.classList.remove("show");
  });


  const triggerModalContainer = modal => {
    modal.classList.add("show");
  }
  
  const task = (title, index, dueDate) => {
    const task = document.createElement("div");
      task.classList.add("task")
      task.innerHTML = `
      <div>
      <input type="checkbox" name="" data-index="${index}">
      <p>${title}</p>
    </div>
    <div>
      <p>${dueDate}</p>
      <span id="delete-task">&times;</span>
      </div>
      `;
      taskContainer.appendChild(task);
      // taskContainer.insertBefore(task, taskContainer.firstElementChild.nextSibling);
  }

  const render = (heading) => {
    // mainPanel.innerHTML = `
    //   <h2>${h2}</h2>
    //   <div id="add-task" class="task">+ Add Task</div>
    // `;
    const h2 = document.createElement("h2");
      h2.innerText = heading;
    const addTask = document.createElement("div");
      addTask.setAttribute("id", "add-task");
      addTask.classList.add("task");
      addTask.innerText = "+ Add Task";
    mainPanel.innerHTML = "";
    mainPanel.appendChild(h2);
    mainPanel.appendChild(taskContainer);
    mainPanel.appendChild(addTask);
    // h2.parentNode.insertBefore(addTask, h2.nextSibling);

  }

  const clearContent = () => {
    taskContainer.innerHTML = "";
  }
  
  return { render, task, clearContent }
})();

//magic stuff happens here
const app = (function() {
  const logic = (taskTitle, description, dueDate, priority, project) => {
    dataBase.pushTask(taskTitle, description, dueDate, priority, project);
    domStuff.clearContent();
    loopTaskData();
 
    console.log(dataBase.taskData);
  }

  const loopTaskData = () => {
    dataBase.taskData.forEach(item => {
      domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate);
    })
  }

  // add function that loops through taskData and renders content on page, if content is to be rendered on a project, filter out objects in taskData that contain the corresponding project name. 

  // weekly/today function that filters out taskData based on due date

  // project function that loops through projectData and refreshes projects on page (when user deletes project)

  // when user deletes a project run a function that takes in project name as a parameter, loop through taskData and delete tasks with corresponding project name

  return { logic, loopTaskData }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RCxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZmFjdG9yeSBmdW5jIHRoYXQgbWFrZXMgdG8tZG9zXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gIGNvbnN0IHRhc2sgPSB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sIFxuICAgIGR1ZURhdGUsIFxuICAgIHByaW9yaXR5LCBcbiAgICBwcm9qZWN0XG4gIH1cblxuICByZXR1cm4gdGFzaztcbn07XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5hbWU7XG59XG5cblxuXG4vL2hvbGRzIGFsbCBkYXRhXG5jb25zdCBkYXRhQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IHRhc2tEYXRhID0gW107XG4gIGxldCBwcm9qZWN0RGF0YSA9IFtdO1xuXG4gIGNvbnN0IHB1c2hUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBjb25zdCB0YXNrID0gdGFza0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgdGFza0RhdGEucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGNvbnN0IHB1c2hQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkobmFtZSk7XG4gICAgcHJvamVjdERhdGEucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHVzaFRhc2ssIHB1c2hQcm9qZWN0LCB0YXNrRGF0YSAsIGRlbGV0ZVRhc2t9O1xufSkoKTtcblxuLy9yZXNwb25zaWJsZSBmb3IgbWFuaXB1bGF0aW5nIHRoZSBkb21cbmNvbnN0IGRvbVN0dWZmID0gKGZ1bmN0aW9uKCkge1xuICAvL21haW4gcGFnZSBxdWVyeSBzZWxlY3RvcnNcbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZVwiKTtcbiAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5XCIpO1xuICBjb25zdCB3ZWVrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrXCIpO1xuICBjb25zdCBuZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctcHJvamVjdFwiKTtcbiAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gIGNvbnN0IG1haW5QYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1wYW5lbFwiKTtcbiAgY29uc3QgbmV3VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFza1wiKTtcblxuICAvL2FkZCB0YXNrIHF1ZXJ5IHNlbGVjdG9yc1xuICBuZXdUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBuZXdUYXNrTW9kYWwpIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICBpZiAoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctdGFza1wiKSkgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICAvL21haW4gcGFnZSBldmVudCBsaXN0ZW5lcnNcbiAgaG9tZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlcihcIkhvbWVcIik7XG4gICAgY2xlYXJDb250ZW50KCk7XG4gICAgYXBwLmxvb3BUYXNrRGF0YSgpO1xuICB9KTtcblxuICB0b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIHdlZWsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICBuZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgdGFza0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcygnI2RlbGV0ZS10YXNrJykpIHtcbiAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICAgICAgZGF0YUJhc2UuZGVsZXRlVGFzayh0YXNrSW5kZXgpXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgfVxuICB9KTtcblxuICBtYWluUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjYWRkLXRhc2tcIikpIHtcbiAgICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdUYXNrTW9kYWwpO1xuICAgIH07XG4gIH0pXG5cbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIikudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFwiKS52YWx1ZTtcbiAgICBhcHAubG9naWModGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cblxuICBjb25zdCB0cmlnZ2VyTW9kYWxDb250YWluZXIgPSBtb2RhbCA9PiB7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gIH1cbiAgXG4gIGNvbnN0IHRhc2sgPSAodGl0bGUsIGluZGV4LCBkdWVEYXRlKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpXG4gICAgICB0YXNrLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXY+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIlwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgPHA+JHt0aXRsZX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxwPiR7ZHVlRGF0ZX08L3A+XG4gICAgICA8c3BhbiBpZD1cImRlbGV0ZS10YXNrXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG4gICAgICAvLyB0YXNrQ29udGFpbmVyLmluc2VydEJlZm9yZSh0YXNrLCB0YXNrQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLm5leHRTaWJsaW5nKTtcbiAgfVxuXG4gIGNvbnN0IHJlbmRlciA9IChoZWFkaW5nKSA9PiB7XG4gICAgLy8gbWFpblBhbmVsLmlubmVySFRNTCA9IGBcbiAgICAvLyAgIDxoMj4ke2gyfTwvaDI+XG4gICAgLy8gICA8ZGl2IGlkPVwiYWRkLXRhc2tcIiBjbGFzcz1cInRhc2tcIj4rIEFkZCBUYXNrPC9kaXY+XG4gICAgLy8gYDtcbiAgICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgIGgyLmlubmVyVGV4dCA9IGhlYWRpbmc7XG4gICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBhZGRUYXNrLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYWRkLXRhc2tcIik7XG4gICAgICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgICAgYWRkVGFzay5pbm5lclRleHQgPSBcIisgQWRkIFRhc2tcIjtcbiAgICBtYWluUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQoaDIpO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQoYWRkVGFzayk7XG4gICAgLy8gaDIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkVGFzaywgaDIubmV4dFNpYmxpbmcpO1xuXG4gIH1cblxuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG4gIFxuICByZXR1cm4geyByZW5kZXIsIHRhc2ssIGNsZWFyQ29udGVudCB9XG59KSgpO1xuXG4vL21hZ2ljIHN0dWZmIGhhcHBlbnMgaGVyZVxuY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBsb2dpYyA9ICh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAgIGRhdGFCYXNlLnB1c2hUYXNrKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoKTtcbiAgICBsb29wVGFza0RhdGEoKTtcbiBcbiAgICBjb25zb2xlLmxvZyhkYXRhQmFzZS50YXNrRGF0YSk7XG4gIH1cblxuICBjb25zdCBsb29wVGFza0RhdGEgPSAoKSA9PiB7XG4gICAgZGF0YUJhc2UudGFza0RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnRhc2soaXRlbS50aXRsZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSwgaXRlbS5kdWVEYXRlKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gYWRkIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0YXNrRGF0YSBhbmQgcmVuZGVycyBjb250ZW50IG9uIHBhZ2UsIGlmIGNvbnRlbnQgaXMgdG8gYmUgcmVuZGVyZWQgb24gYSBwcm9qZWN0LCBmaWx0ZXIgb3V0IG9iamVjdHMgaW4gdGFza0RhdGEgdGhhdCBjb250YWluIHRoZSBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZS4gXG5cbiAgLy8gd2Vla2x5L3RvZGF5IGZ1bmN0aW9uIHRoYXQgZmlsdGVycyBvdXQgdGFza0RhdGEgYmFzZWQgb24gZHVlIGRhdGVcblxuICAvLyBwcm9qZWN0IGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCBwcm9qZWN0RGF0YSBhbmQgcmVmcmVzaGVzIHByb2plY3RzIG9uIHBhZ2UgKHdoZW4gdXNlciBkZWxldGVzIHByb2plY3QpXG5cbiAgLy8gd2hlbiB1c2VyIGRlbGV0ZXMgYSBwcm9qZWN0IHJ1biBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gcHJvamVjdCBuYW1lIGFzIGEgcGFyYW1ldGVyLCBsb29wIHRocm91Z2ggdGFza0RhdGEgYW5kIGRlbGV0ZSB0YXNrcyB3aXRoIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBuYW1lXG5cbiAgcmV0dXJuIHsgbG9naWMsIGxvb3BUYXNrRGF0YSB9XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==