/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//factory func that makes to-dos
const taskFactory = (title, description, dueDate, priority, checked = false, project) => {
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
  return name;
}



//holds all data
const dataBase = (function() {
  let taskData = [];
  let projectData = [];

  const pushTask = (title, description, dueDate, priority, checked, project) => {
    const task = taskFactory(title, description, dueDate, priority, checked, project);
    taskData.push(task);
  }

  const pushProject = (name) => {
    const project = projectFactory(name);
    projectData.push(project);
  }

  const deleteTask = () => {

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
  const contentContainer = document.querySelector(".content-container");

  //add task query selectors
  const newTaskContainer = document.querySelector(".new-task");

  newTaskContainer.addEventListener("click", (e) => {
    if (e.target === newTaskContainer) newTaskContainer.classList.remove('show');
    if (e.target.hasAttribute('delete-task')) {

    }

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
    app.logic(taskTitle, description, dueDate, priority, project);

  })


  //main page event listeners
  home.addEventListener("click", () => {
    render("Hi");
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  newProject.addEventListener("click", () => {

  });

  contentContainer.addEventListener("click", e => {
    if(e.target.matches("#add-task")) {
      triggerModalContainer(newTaskContainer);
    }
  });

  
  

  const triggerModalContainer = modal => {
    modal.classList.add("show");
  }
  
  const task = (title, index, dueDate) => {
    const task = document.createElement("div");
      task.classList.add("task")
      task.innerHTML = `
      <div>
      <input type="checkbox" name="" id="${index}">
      <p>${title}</p>
    </div>
    <div>
      <p>${dueDate}</p>
      <span id="delete-task">&times;</span>
      </div>
      `;
      contentContainer.appendChild(task);
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
    contentContainer.appendChild(h2);
    contentContainer.appendChild(addTask);

  }
  
  return { render, task }
})();

//magic stuff happens here
const app = (function() {
  const logic = (taskTitle, description, dueDate, priority, project) => {
    dataBase.pushTask(taskTitle, description, dueDate, priority, project);
    console.log(dataBase.taskData);
    idk();
  }

  const idk = () => {
    dataBase.taskData.forEach(item => {
      domStuff.task(item.title, item.dueDate, dataBase.taskData.indexOf(item));
    })
  }

  // add function that loops through taskData and renders content on page, if content is to be rendered on a project, filter out objects in taskData that contain the corresponding project name. 

  // weekly/today function that filters out taskData based on due date

  // project function that loops through projectData and refreshes projects on page (when user deletes project)

  // when user deletes a project run a function that takes in project name as a parameter, loop through taskData and delete tasks with corresponding project name

  return { logic }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7Ozs7O0FBS0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsTUFBTTtBQUNqRCxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZmFjdG9yeSBmdW5jIHRoYXQgbWFrZXMgdG8tZG9zXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkID0gZmFsc2UsIHByb2plY3QpID0+IHtcbiAgY29uc3QgdGFzayA9IHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbiwgXG4gICAgZHVlRGF0ZSwgXG4gICAgcHJpb3JpdHksIFxuICAgIGNoZWNrZWQsXG4gICAgcHJvamVjdFxuICB9XG5cbiAgcmV0dXJuIHRhc2s7XG59O1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuYW1lO1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2godGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KG5hbWUpO1xuICAgIHByb2plY3REYXRhLnB1c2gocHJvamVjdCk7XG4gIH1cblxuICBjb25zdCBkZWxldGVUYXNrID0gKCkgPT4ge1xuXG4gIH1cblxuICByZXR1cm4geyBwdXNoVGFzaywgcHVzaFByb2plY3QsIHRhc2tEYXRhIH07XG59KSgpO1xuXG4vL3Jlc3BvbnNpYmxlIGZvciBtYW5pcHVsYXRpbmcgdGhlIGRvbVxuY29uc3QgZG9tU3R1ZmYgPSAoZnVuY3Rpb24oKSB7XG4gIC8vbWFpbiBwYWdlIHF1ZXJ5IHNlbGVjdG9yc1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0XCIpO1xuICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LWNvbnRhaW5lclwiKTtcblxuICAvL2FkZCB0YXNrIHF1ZXJ5IHNlbGVjdG9yc1xuICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFza1wiKTtcblxuICBuZXdUYXNrQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldCA9PT0gbmV3VGFza0NvbnRhaW5lcikgbmV3VGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGVsZXRlLXRhc2snKSkge1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGNvbnN0IGNsb3NlTmV3VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtbmV3LXRhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXRpdGxlXCIpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkdWUtZGF0ZVwiKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIikudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFwiKS52YWx1ZTtcbiAgICBhcHAubG9naWModGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuXG4gIH0pXG5cblxuICAvL21haW4gcGFnZSBldmVudCBsaXN0ZW5lcnNcbiAgaG9tZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlcihcIkhpXCIpO1xuICB9KTtcblxuICB0b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIHdlZWsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICBuZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgY29udGVudENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIiNhZGQtdGFza1wiKSkge1xuICAgICAgdHJpZ2dlck1vZGFsQ29udGFpbmVyKG5ld1Rhc2tDb250YWluZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgXG4gIFxuXG4gIGNvbnN0IHRyaWdnZXJNb2RhbENvbnRhaW5lciA9IG1vZGFsID0+IHtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgfVxuICBcbiAgY29uc3QgdGFzayA9ICh0aXRsZSwgaW5kZXgsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIilcbiAgICAgIHRhc2suaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgaWQ9XCIke2luZGV4fVwiPlxuICAgICAgPHA+JHt0aXRsZX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxwPiR7ZHVlRGF0ZX08L3A+XG4gICAgICA8c3BhbiBpZD1cImRlbGV0ZS10YXNrXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgIGNvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAoaGVhZGluZykgPT4ge1xuICAgIC8vIG1haW5QYW5lbC5pbm5lckhUTUwgPSBgXG4gICAgLy8gICA8aDI+JHtoMn08L2gyPlxuICAgIC8vICAgPGRpdiBpZD1cImFkZC10YXNrXCIgY2xhc3M9XCJ0YXNrXCI+KyBBZGQgVGFzazwvZGl2PlxuICAgIC8vIGA7XG4gICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICBoMi5pbm5lclRleHQgPSBoZWFkaW5nO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYWRkVGFzay5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFkZC10YXNrXCIpO1xuICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgIGFkZFRhc2suaW5uZXJUZXh0ID0gXCIrIEFkZCBUYXNrXCI7XG4gICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChoMik7XG4gICAgY29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrKTtcblxuICB9XG4gIFxuICByZXR1cm4geyByZW5kZXIsIHRhc2sgfVxufSkoKTtcblxuLy9tYWdpYyBzdHVmZiBoYXBwZW5zIGhlcmVcbmNvbnN0IGFwcCA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgbG9naWMgPSAodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBkYXRhQmFzZS5wdXNoVGFzayh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgY29uc29sZS5sb2coZGF0YUJhc2UudGFza0RhdGEpO1xuICAgIGlkaygpO1xuICB9XG5cbiAgY29uc3QgaWRrID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnRhc2tEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi50YXNrKGl0ZW0udGl0bGUsIGl0ZW0uZHVlRGF0ZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSk7XG4gICAgfSlcbiAgfVxuXG4gIC8vIGFkZCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggdGFza0RhdGEgYW5kIHJlbmRlcnMgY29udGVudCBvbiBwYWdlLCBpZiBjb250ZW50IGlzIHRvIGJlIHJlbmRlcmVkIG9uIGEgcHJvamVjdCwgZmlsdGVyIG91dCBvYmplY3RzIGluIHRhc2tEYXRhIHRoYXQgY29udGFpbiB0aGUgY29ycmVzcG9uZGluZyBwcm9qZWN0IG5hbWUuIFxuXG4gIC8vIHdlZWtseS90b2RheSBmdW5jdGlvbiB0aGF0IGZpbHRlcnMgb3V0IHRhc2tEYXRhIGJhc2VkIG9uIGR1ZSBkYXRlXG5cbiAgLy8gcHJvamVjdCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggcHJvamVjdERhdGEgYW5kIHJlZnJlc2hlcyBwcm9qZWN0cyBvbiBwYWdlICh3aGVuIHVzZXIgZGVsZXRlcyBwcm9qZWN0KVxuXG4gIC8vIHdoZW4gdXNlciBkZWxldGVzIGEgcHJvamVjdCBydW4gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGluIHByb2plY3QgbmFtZSBhcyBhIHBhcmFtZXRlciwgbG9vcCB0aHJvdWdoIHRhc2tEYXRhIGFuZCBkZWxldGUgdGFza3Mgd2l0aCBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZVxuXG4gIHJldHVybiB7IGxvZ2ljIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9