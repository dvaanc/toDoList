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

const projectFactory = (title) => {
  return title;
}



//holds all data
const dataBase = (function() {
  let taskData = [];
  let projectData = [];

  const pushTask = (title, description, dueDate, priority, project) => {
    const task = taskFactory(title, description, dueDate, priority, project);
    taskData.push(task);
  }

  const pushProject = (title) => {
    const project = projectFactory(title);
    projectData.push(project);
  }

  const deleteTask = (index) => {
    taskData.splice(index, 1);
  }

  const deleteProject = (index) => {
    projectData.splice(index, 1);
  }

  return { pushTask, pushProject, taskData, projectData , deleteTask, deleteProject};
})();

//responsible for manipulating the dom
const domStuff = (function() {
  //side panel
  const sidePanel = document.querySelector(".side-panel");
  const home = document.querySelector("#home");
  const today = document.querySelector("#today");
  const week = document.querySelector("#week");
  const addProjectButton = document.querySelector("#new-project-button");
  const projectContainer = document.querySelector(".new-project");
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
    app.grabTaskData();
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

  const newTaskForm = document.querySelector("#new-task").addEventListener("submit", e => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const project = document.querySelector("#project-select").value;
    app.loadTask(taskTitle, description, dueDate, priority, project);
    newTaskModal.classList.remove("show");
  });

  const newProjectForm = document.querySelector("#add-project").addEventListener("submit", e => {
    e.preventDefault();
    const projectTitle = document.querySelector("#project-title").value;
    app.loadProject(projectTitle);
    projectContainer.classList.remove("show");

  })

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

  const project = (title, index) => {
    const project = document.createElement("div");
      project.innerHTML = `
      <div data-index="${index}">
        <p>${title}</p>
      </div>
      `;
    sidePanel.appendChild(project);
  }

  const viewTask = () => {
    
  }

  const editTask = () => {
    
  }

  const clearContent = () => {
    taskContainer.innerHTML = "";
  }
  
  return { render, task, project, clearContent }
})();

//magic stuff happens here
const app = (function() {
  const loadTask = (taskTitle, description, dueDate, priority, project) => {
    pushTask(taskTitle, description, dueDate, priority, project);
    domStuff.clearContent();
    grabTaskData();
 
    console.log(dataBase.taskData);
  }

  const pushTask = (taskTitle, description, dueDate, priority, project) => {
    dataBase.pushTask(taskTitle, description, dueDate, priority, project);
  }

  const grabTaskData = () => {
    dataBase.taskData.forEach(item => {
      domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate);
    })
  }

  const loadProject = (title) => {
    dataBase.pushProject(title);
    domStuff.clearContent();
    grabProjectData();
  }

  const grabProjectData = () => {
    dataBase.projectData.forEach(item => {
      domStuff.project(item.title, dataBase.projectData.indexOf(item));
    })
  }

  const sortByWeek = () => {

  }

  const sortByToday = () => {
    
  }

  const refreshProjects = () => {

  }

  const editTask = () => {

  }
  // add function that loops through taskData and renders content on page, if content is to be rendered on a project, filter out objects in taskData that contain the corresponding project name. 

  // weekly/today function that filters out taskData based on due date

  // project function that loops through projectData and refreshes projects on page (when user deletes project)

  // when user deletes a project run a function that takes in project name as a parameter, loop through taskData and delete tasks with corresponding project name

  return { loadTask, loadProject, grabProjectData, grabTaskData }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsTUFBTTtBQUMvQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9mYWN0b3J5IGZ1bmMgdGhhdCBtYWtlcyB0by1kb3NcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgY29uc3QgdGFzayA9IHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbiwgXG4gICAgZHVlRGF0ZSwgXG4gICAgcHJpb3JpdHksIFxuICAgIHByb2plY3RcbiAgfVxuXG4gIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUpID0+IHtcbiAgcmV0dXJuIHRpdGxlO1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2godGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh0aXRsZSk7XG4gICAgcHJvamVjdERhdGEucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChpbmRleCkgPT4ge1xuICAgIHByb2plY3REYXRhLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICByZXR1cm4geyBwdXNoVGFzaywgcHVzaFByb2plY3QsIHRhc2tEYXRhLCBwcm9qZWN0RGF0YSAsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3R9O1xufSkoKTtcblxuLy9yZXNwb25zaWJsZSBmb3IgbWFuaXB1bGF0aW5nIHRoZSBkb21cbmNvbnN0IGRvbVN0dWZmID0gKGZ1bmN0aW9uKCkge1xuICAvL3NpZGUgcGFuZWxcbiAgY29uc3Qgc2lkZVBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLXBhbmVsXCIpO1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0LWJ1dHRvblwiKTtcbiAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3RcIik7XG4gIC8vbWFpbiBwYW5lbCBcbiAgY29uc3QgbWFpblBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXBhbmVsXCIpO1xuICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcbiAgLy9tb2RhbHMgdGhhdCBwb3B1cCB3aGVuIGNsaWNrZWQgXG4gIGNvbnN0IG5ld1Byb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3RcIik7XG4gIGNvbnN0IG5ld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2tcIik7XG5cbiAgLy9yZW5kZXJzIHRhc2tzIGFuZCBmaWx0ZXJzIG91dCB0YXNrcyh0b2RheSwgd2VlaylcbiAgaG9tZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlcihcIkhvbWVcIik7XG4gICAgY2xlYXJDb250ZW50KCk7XG4gICAgYXBwLmdyYWJUYXNrRGF0YSgpO1xuICB9KTtcblxuICB0b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIHdlZWsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICAvL3RyaWdnZXJzIG5ld1Byb2plY3RNb2RhbCB3aGVuICsgbmV3IHByb2plY3QgYnV0dG9uIGlzIHByZXNzZWQgb24gc2lkZSBwYW5lbFxuICBzaWRlUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjbmV3LXByb2plY3QtYnV0dG9uXCIpKSB7XG4gICAgICB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3UHJvamVjdE1vZGFsKTtcbiAgICB9XG4gIH0pXG5cbiAgbWFpblBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKFwiI2FkZC10YXNrXCIpKSB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3VGFza01vZGFsKTtcbiAgXG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi50YXNrXCIpKSBlZGl0VGFzaygpO1xuICB9KVxuXG4gIG5ld1Rhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZihlLnRhcmdldCA9PT0gbmV3VGFza01vZGFsKSBuZXdUYXNrTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctdGFza1wiKSkgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICBuZXdQcm9qZWN0TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYoZS50YXJnZXQgPT09IG5ld1Byb2plY3RNb2RhbCkgbmV3UHJvamVjdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2UtbmV3LXByb2plY3RcIikpIG5ld1Byb2plY3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cblxuICAvL21haW4gcGFnZSBldmVudCBsaXN0ZW5lcnNcbiAgdGFza0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcygnI2RlbGV0ZS10YXNrJykpIHtcbiAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICAgICAgZGF0YUJhc2UuZGVsZXRlVGFzayh0YXNrSW5kZXgpXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIikudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2R1ZS1kYXRlXCIpLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdFwiKS52YWx1ZTtcbiAgICBhcHAubG9hZFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBhcHAubG9hZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gIH0pXG5cbiAgY29uc3QgdHJpZ2dlck1vZGFsQ29udGFpbmVyID0gbW9kYWwgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyID0gKGhlYWRpbmcpID0+IHtcbiAgICAvLyBtYWluUGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgPGgyPiR7aDJ9PC9oMj5cbiAgICAvLyAgIDxkaXYgaWQ9XCJhZGQtdGFza1wiIGNsYXNzPVwidGFza1wiPisgQWRkIFRhc2s8L2Rpdj5cbiAgICAvLyBgO1xuICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gaGVhZGluZztcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGFkZFRhc2suc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhZGQtdGFza1wiKTtcbiAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgICBhZGRUYXNrLmlubmVyVGV4dCA9IFwiKyBBZGQgVGFza1wiO1xuICAgIG1haW5QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChoMik7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChhZGRUYXNrKTtcbiAgICAvLyBoMi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRUYXNrLCBoMi5uZXh0U2libGluZyk7XG5cbiAgfVxuICBcbiAgY29uc3QgdGFzayA9ICh0aXRsZSwgaW5kZXgsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIilcbiAgICAgIHRhc2suaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICA8cD4ke3RpdGxlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHA+JHtkdWVEYXRlfTwvcD5cbiAgICAgIDxzcGFuIGlkPVwiZGVsZXRlLXRhc2tcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgICAgIC8vIHRhc2tDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRhc2ssIHRhc2tDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dFNpYmxpbmcpO1xuICB9XG5cbiAgLy8gY29uc3QgZWRpdFRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAvLyB9XG5cbiAgY29uc3QgcHJvamVjdCA9ICh0aXRsZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgPHA+JHt0aXRsZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgc2lkZVBhbmVsLmFwcGVuZENoaWxkKHByb2plY3QpO1xuICB9XG5cbiAgY29uc3Qgdmlld1Rhc2sgPSAoKSA9PiB7XG4gICAgXG4gIH1cblxuICBjb25zdCBlZGl0VGFzayA9ICgpID0+IHtcbiAgICBcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQ29udGVudCA9ICgpID0+IHtcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIH1cbiAgXG4gIHJldHVybiB7IHJlbmRlciwgdGFzaywgcHJvamVjdCwgY2xlYXJDb250ZW50IH1cbn0pKCk7XG5cbi8vbWFnaWMgc3R1ZmYgaGFwcGVucyBoZXJlXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGxvYWRUYXNrID0gKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgcHVzaFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudCgpO1xuICAgIGdyYWJUYXNrRGF0YSgpO1xuIFxuICAgIGNvbnNvbGUubG9nKGRhdGFCYXNlLnRhc2tEYXRhKTtcbiAgfVxuXG4gIGNvbnN0IHB1c2hUYXNrID0gKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICB9XG5cbiAgY29uc3QgZ3JhYlRhc2tEYXRhID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnRhc2tEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi50YXNrKGl0ZW0udGl0bGUsIGRhdGFCYXNlLnRhc2tEYXRhLmluZGV4T2YoaXRlbSksIGl0ZW0uZHVlRGF0ZSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRQcm9qZWN0ID0gKHRpdGxlKSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFByb2plY3QodGl0bGUpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudCgpO1xuICAgIGdyYWJQcm9qZWN0RGF0YSgpO1xuICB9XG5cbiAgY29uc3QgZ3JhYlByb2plY3REYXRhID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnByb2plY3REYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi5wcm9qZWN0KGl0ZW0udGl0bGUsIGRhdGFCYXNlLnByb2plY3REYXRhLmluZGV4T2YoaXRlbSkpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBzb3J0QnlXZWVrID0gKCkgPT4ge1xuXG4gIH1cblxuICBjb25zdCBzb3J0QnlUb2RheSA9ICgpID0+IHtcbiAgICBcbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hQcm9qZWN0cyA9ICgpID0+IHtcblxuICB9XG5cbiAgY29uc3QgZWRpdFRhc2sgPSAoKSA9PiB7XG5cbiAgfVxuICAvLyBhZGQgZnVuY3Rpb24gdGhhdCBsb29wcyB0aHJvdWdoIHRhc2tEYXRhIGFuZCByZW5kZXJzIGNvbnRlbnQgb24gcGFnZSwgaWYgY29udGVudCBpcyB0byBiZSByZW5kZXJlZCBvbiBhIHByb2plY3QsIGZpbHRlciBvdXQgb2JqZWN0cyBpbiB0YXNrRGF0YSB0aGF0IGNvbnRhaW4gdGhlIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBuYW1lLiBcblxuICAvLyB3ZWVrbHkvdG9kYXkgZnVuY3Rpb24gdGhhdCBmaWx0ZXJzIG91dCB0YXNrRGF0YSBiYXNlZCBvbiBkdWUgZGF0ZVxuXG4gIC8vIHByb2plY3QgZnVuY3Rpb24gdGhhdCBsb29wcyB0aHJvdWdoIHByb2plY3REYXRhIGFuZCByZWZyZXNoZXMgcHJvamVjdHMgb24gcGFnZSAod2hlbiB1c2VyIGRlbGV0ZXMgcHJvamVjdClcblxuICAvLyB3aGVuIHVzZXIgZGVsZXRlcyBhIHByb2plY3QgcnVuIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBpbiBwcm9qZWN0IG5hbWUgYXMgYSBwYXJhbWV0ZXIsIGxvb3AgdGhyb3VnaCB0YXNrRGF0YSBhbmQgZGVsZXRlIHRhc2tzIHdpdGggY29ycmVzcG9uZGluZyBwcm9qZWN0IG5hbWVcblxuICByZXR1cm4geyBsb2FkVGFzaywgbG9hZFByb2plY3QsIGdyYWJQcm9qZWN0RGF0YSwgZ3JhYlRhc2tEYXRhIH1cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9