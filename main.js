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
  //side panel
  const sidePanel = document.querySelector(".side-panel");
  const home = document.querySelector("#home");
  const today = document.querySelector("#today");
  const week = document.querySelector("#week");
  //main panel 
  const mainPanel = document.querySelector(".main-panel");
  const taskContainer = document.querySelector(".task-container");
  //modals that popup when clicked 
  const newProjectModal = document.querySelector(".new-project");
  const newTaskModal = document.querySelector(".new-task");

  //renders tasks and filters out tasks(today, week)
  home.addEventListener("click", () => {
    render("Home");
    clearContent();
    app.loopTaskData();
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  //triggers newProjectModal when + new project button is pressed on side panel
  sidePanel.addEventListener("click", e => {
    if(e.target.matches("#new-project-button")) {
      triggerModalContainer(newProjectModal);
    }
  })

  mainPanel.addEventListener("click", e => {
    if(e.target.matches("#add-task")) triggerModalContainer(newTaskModal);
  
    if(e.target.matches(".task")) editTask();
  })

  newTaskModal.addEventListener("click", (e) => {
    if(e.target === newTaskModal) newTaskModal.classList.remove("show");
    if(e.target.matches(".close-new-task")) newTaskModal.classList.remove("show");
  });

  newProjectModal.addEventListener("click", (e) => {
    if(e.target === newProjectModal) newProjectModal.classList.remove("show");
    if(e.target.matches(".close-new-project")) newProjectModal.classList.remove("show");
  });


  //main page event listeners
  taskContainer.addEventListener("click", e => {
    if(e.target.matches('#delete-task')) {
      const taskIndex = e.target.parentNode.parentNode.dataset.index;
      dataBase.deleteTask(taskIndex)
      e.target.parentNode.parentNode.remove();
    }
  })

  const newTaskForm = document.querySelector("#new-task").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#project-select").value;
    app.logic(taskTitle, description, dueDate, priority, project);
    newTaskModal.classList.remove("show");
  });

  const triggerModalContainer = modal => {
    modal.classList.add("show");
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

  // const editTask = (title, description, dueDate, priority, project) => {
  //   e.preventDefault();

  // }

  const viewTask = () => {
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZmFjdG9yeSBmdW5jIHRoYXQgbWFrZXMgdG8tZG9zXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gIGNvbnN0IHRhc2sgPSB7XG4gICAgdGl0bGUsXG4gICAgZGVzY3JpcHRpb24sIFxuICAgIGR1ZURhdGUsIFxuICAgIHByaW9yaXR5LCBcbiAgICBwcm9qZWN0XG4gIH1cblxuICByZXR1cm4gdGFzaztcbn07XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5hbWU7XG59XG5cblxuXG4vL2hvbGRzIGFsbCBkYXRhXG5jb25zdCBkYXRhQmFzZSA9IChmdW5jdGlvbigpIHtcbiAgbGV0IHRhc2tEYXRhID0gW107XG4gIGxldCBwcm9qZWN0RGF0YSA9IFtdO1xuXG4gIGNvbnN0IHB1c2hUYXNrID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBjb25zdCB0YXNrID0gdGFza0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgdGFza0RhdGEucHVzaCh0YXNrKTtcbiAgfVxuXG4gIGNvbnN0IHB1c2hQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkobmFtZSk7XG4gICAgcHJvamVjdERhdGEucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHVzaFRhc2ssIHB1c2hQcm9qZWN0LCB0YXNrRGF0YSAsIGRlbGV0ZVRhc2t9O1xufSkoKTtcblxuLy9yZXNwb25zaWJsZSBmb3IgbWFuaXB1bGF0aW5nIHRoZSBkb21cbmNvbnN0IGRvbVN0dWZmID0gKGZ1bmN0aW9uKCkge1xuICAvL3NpZGUgcGFuZWxcbiAgY29uc3Qgc2lkZVBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLXBhbmVsXCIpO1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIC8vbWFpbiBwYW5lbCBcbiAgY29uc3QgbWFpblBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXBhbmVsXCIpO1xuICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcbiAgLy9tb2RhbHMgdGhhdCBwb3B1cCB3aGVuIGNsaWNrZWQgXG4gIGNvbnN0IG5ld1Byb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3RcIik7XG4gIGNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2tcIik7XG5cbiAgLy9yZW5kZXJzIHRhc2tzIGFuZCBmaWx0ZXJzIG91dCB0YXNrcyh0b2RheSwgd2VlaylcbiAgaG9tZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlcihcIkhvbWVcIik7XG4gICAgY2xlYXJDb250ZW50KCk7XG4gICAgYXBwLmxvb3BUYXNrRGF0YSgpO1xuICB9KTtcblxuICB0b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIHdlZWsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICAvL3RyaWdnZXJzIG5ld1Byb2plY3RNb2RhbCB3aGVuICsgbmV3IHByb2plY3QgYnV0dG9uIGlzIHByZXNzZWQgb24gc2lkZSBwYW5lbFxuICBzaWRlUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjbmV3LXByb2plY3QtYnV0dG9uXCIpKSB7XG4gICAgICB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3UHJvamVjdE1vZGFsKTtcbiAgICB9XG4gIH0pXG5cbiAgbWFpblBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKFwiI2FkZC10YXNrXCIpKSB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3VGFza01vZGFsKTtcbiAgXG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi50YXNrXCIpKSBlZGl0VGFzaygpO1xuICB9KVxuXG4gIG5ld1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZihlLnRhcmdldCA9PT0gbmV3VGFza01vZGFsKSBuZXdUYXNrTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctdGFza1wiKSkgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICBuZXdQcm9qZWN0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYoZS50YXJnZXQgPT09IG5ld1Byb2plY3RNb2RhbCkgbmV3UHJvamVjdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2UtbmV3LXByb2plY3RcIikpIG5ld1Byb2plY3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cblxuICAvL21haW4gcGFnZSBldmVudCBsaXN0ZW5lcnNcbiAgdGFza0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcygnI2RlbGV0ZS10YXNrJykpIHtcbiAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICAgICAgZGF0YUJhc2UuZGVsZXRlVGFzayh0YXNrSW5kZXgpXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHVlLWRhdGVcIikudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0XCIpLnZhbHVlO1xuICAgIGFwcC5sb2dpYyh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICBjb25zdCB0cmlnZ2VyTW9kYWxDb250YWluZXIgPSBtb2RhbCA9PiB7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAoaGVhZGluZykgPT4ge1xuICAgIC8vIG1haW5QYW5lbC5pbm5lckhUTUwgPSBgXG4gICAgLy8gICA8aDI+JHtoMn08L2gyPlxuICAgIC8vICAgPGRpdiBpZD1cImFkZC10YXNrXCIgY2xhc3M9XCJ0YXNrXCI+KyBBZGQgVGFzazwvZGl2PlxuICAgIC8vIGA7XG4gICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICBoMi5pbm5lclRleHQgPSBoZWFkaW5nO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYWRkVGFzay5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFkZC10YXNrXCIpO1xuICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgIGFkZFRhc2suaW5uZXJUZXh0ID0gXCIrIEFkZCBUYXNrXCI7XG4gICAgbWFpblBhbmVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKGgyKTtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQodGFza0NvbnRhaW5lcik7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKGFkZFRhc2spO1xuICAgIC8vIGgyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFkZFRhc2ssIGgyLm5leHRTaWJsaW5nKTtcblxuICB9XG4gIFxuICBjb25zdCB0YXNrID0gKHRpdGxlLCBpbmRleCwgZHVlRGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKVxuICAgICAgdGFzay5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2PlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJcIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgIDxwPiR7dGl0bGV9PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8cD4ke2R1ZURhdGV9PC9wPlxuICAgICAgPHNwYW4gaWQ9XCJkZWxldGUtdGFza1wiPiZ0aW1lczs8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2spO1xuICAgICAgLy8gdGFza0NvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFzaywgdGFza0NvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0U2libGluZyk7XG4gIH1cblxuICAvLyBjb25zdCBlZGl0VGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIH1cblxuICBjb25zdCB2aWV3VGFzayA9ICgpID0+IHtcbiAgICBcbiAgfVxuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG4gIFxuICByZXR1cm4geyByZW5kZXIsIHRhc2ssIGNsZWFyQ29udGVudCB9XG59KSgpO1xuXG4vL21hZ2ljIHN0dWZmIGhhcHBlbnMgaGVyZVxuY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBsb2dpYyA9ICh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAgIGRhdGFCYXNlLnB1c2hUYXNrKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoKTtcbiAgICBsb29wVGFza0RhdGEoKTtcbiBcbiAgICBjb25zb2xlLmxvZyhkYXRhQmFzZS50YXNrRGF0YSk7XG4gIH1cblxuICBjb25zdCBsb29wVGFza0RhdGEgPSAoKSA9PiB7XG4gICAgZGF0YUJhc2UudGFza0RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnRhc2soaXRlbS50aXRsZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSwgaXRlbS5kdWVEYXRlKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gYWRkIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0YXNrRGF0YSBhbmQgcmVuZGVycyBjb250ZW50IG9uIHBhZ2UsIGlmIGNvbnRlbnQgaXMgdG8gYmUgcmVuZGVyZWQgb24gYSBwcm9qZWN0LCBmaWx0ZXIgb3V0IG9iamVjdHMgaW4gdGFza0RhdGEgdGhhdCBjb250YWluIHRoZSBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZS4gXG5cbiAgLy8gd2Vla2x5L3RvZGF5IGZ1bmN0aW9uIHRoYXQgZmlsdGVycyBvdXQgdGFza0RhdGEgYmFzZWQgb24gZHVlIGRhdGVcblxuICAvLyBwcm9qZWN0IGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCBwcm9qZWN0RGF0YSBhbmQgcmVmcmVzaGVzIHByb2plY3RzIG9uIHBhZ2UgKHdoZW4gdXNlciBkZWxldGVzIHByb2plY3QpXG5cbiAgLy8gd2hlbiB1c2VyIGRlbGV0ZXMgYSBwcm9qZWN0IHJ1biBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gcHJvamVjdCBuYW1lIGFzIGEgcGFyYW1ldGVyLCBsb29wIHRocm91Z2ggdGFza0RhdGEgYW5kIGRlbGV0ZSB0YXNrcyB3aXRoIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBuYW1lXG5cbiAgcmV0dXJuIHsgbG9naWMsIGxvb3BUYXNrRGF0YSB9XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==