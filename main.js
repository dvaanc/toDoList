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
  return { title };
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
  const addProjectButton = document.querySelector("#new-project-button").addEventListener("click", () => {
    triggerModalContainer(newProjectModal);
  })
  const addTaskButton = document.querySelector("#add-task").addEventListener("click", () => {
    app.addProjectOptions();
    triggerModalContainer(newTaskModal);
  })
  const projectContainer = document.querySelector(".new-project");
  //main panel 
  const mainPanel = document.querySelector(".main-panel");
  const taskContainer = document.querySelector(".task-container");
  const projectList = document.querySelector("#project-list")
  //modals that popup when clicked 
  const newProjectModal = document.querySelector(".new-project");
  const newTaskModal = document.querySelector(".new-task");
  const projectOptions = document.querySelector("#project-options");

  //renders tasks and filters out tasks(today, week)
  home.addEventListener("click", () => {
    render("Home");
    clearContent("taskContainer");
    app.grabTaskData();
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  //triggers newProjectModal when + new project button is pressed on side panel
  sidePanel.addEventListener("click", e => {
  
    if(e.target.matches(".project")) {
      clearContent("taskContainer");
      app.filterTask(e.target.innerText);
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
    const project = document.querySelector("#project-options").value;
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

  const addProjectOptions = (project) => {
    const option = document.createElement("option");
      option.setAttribute("value", project);
      option.innerText = project;
      projectOptions.appendChild(option);

  }

  const project = (title, index) => {
    const project = document.createElement("div");
      project.classList.add("project");
      project.setAttribute("data-index", index);
      project.innerHTML = `
        <p>${title}</p>

      `;
    projectList.appendChild(project);
  }

  const viewTask = () => {
    
  }

  const editTask = () => {
    
  }

  const clearContent = (contentType) => {
    switch(contentType) {
      case "taskContainer":
        taskContainer.innerHTML = "";
        break;
      case "projectOptions":
        projectOptions.innerHTML = "";
        break;
      case "projectList":
        projectList.innerHTML = "";
        break;
    };
  
  }
  
  return { render, task, project, clearContent, addProjectOptions }
})();

//magic stuff happens here
const app = (function() {
  const loadTask = (taskTitle, description, dueDate, priority, project) => {
    pushTask(taskTitle, description, dueDate, priority, project);
    domStuff.clearContent("taskContainer");
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
    console.log(dataBase.projectData);
    domStuff.clearContent("taskContainer");
    domStuff.clearContent("projectList")
    grabProjectData();
  }

  const grabProjectData = () => {
    dataBase.projectData.forEach(item => {
      domStuff.project(item.title, dataBase.projectData.indexOf(item));
    })
  }

  const filterTask = (projectTitle) => {
   const filteredTasks = dataBase.taskData.filter(item => item.project === projectTitle);
    filteredTasks.forEach(item => {
      domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate);
    })
  }

  const addProjectOptions = () => {
    domStuff.clearContent("projectOptions")
    dataBase.projectData.forEach(item => {
      domStuff.addProjectOptions(item.title);
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

  return { loadTask, loadProject, grabProjectData, grabTaskData, filterTask, addProjectOptions }
})();

console.log(dataBase.projectData);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRCxrQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9mYWN0b3J5IGZ1bmMgdGhhdCBtYWtlcyB0by1kb3NcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgY29uc3QgdGFzayA9IHtcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbiwgXG4gICAgZHVlRGF0ZSwgXG4gICAgcHJpb3JpdHksIFxuICAgIHByb2plY3RcbiAgfVxuXG4gIHJldHVybiB0YXNrO1xufTtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUpID0+IHtcbiAgcmV0dXJuIHsgdGl0bGUgfTtcbn1cblxuXG5cbi8vaG9sZHMgYWxsIGRhdGFcbmNvbnN0IGRhdGFCYXNlID0gKGZ1bmN0aW9uKCkge1xuICBsZXQgdGFza0RhdGEgPSBbXTtcbiAgbGV0IHByb2plY3REYXRhID0gW107XG5cbiAgY29uc3QgcHVzaFRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSB0YXNrRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICB0YXNrRGF0YS5wdXNoKHRhc2spO1xuICB9XG5cbiAgY29uc3QgcHVzaFByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkodGl0bGUpO1xuICAgIHByb2plY3REYXRhLnB1c2gocHJvamVjdCk7XG4gIH1cblxuICBjb25zdCBkZWxldGVUYXNrID0gKGluZGV4KSA9PiB7XG4gICAgdGFza0RhdGEuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoaW5kZXgpID0+IHtcbiAgICBwcm9qZWN0RGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHsgcHVzaFRhc2ssIHB1c2hQcm9qZWN0LCB0YXNrRGF0YSwgcHJvamVjdERhdGEgLCBkZWxldGVUYXNrLCBkZWxldGVQcm9qZWN0fTtcbn0pKCk7XG5cbi8vcmVzcG9uc2libGUgZm9yIG1hbmlwdWxhdGluZyB0aGUgZG9tXG5jb25zdCBkb21TdHVmZiA9IChmdW5jdGlvbigpIHtcbiAgLy9zaWRlIHBhbmVsXG4gIGNvbnN0IHNpZGVQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZS1wYW5lbFwiKTtcbiAgY29uc3QgaG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZVwiKTtcbiAgY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5XCIpO1xuICBjb25zdCB3ZWVrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrXCIpO1xuICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctcHJvamVjdC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3UHJvamVjdE1vZGFsKTtcbiAgfSlcbiAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBhcHAuYWRkUHJvamVjdE9wdGlvbnMoKTtcbiAgICB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3VGFza01vZGFsKTtcbiAgfSlcbiAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3RcIik7XG4gIC8vbWFpbiBwYW5lbCBcbiAgY29uc3QgbWFpblBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXBhbmVsXCIpO1xuICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbGlzdFwiKVxuICAvL21vZGFscyB0aGF0IHBvcHVwIHdoZW4gY2xpY2tlZCBcbiAgY29uc3QgbmV3UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctcHJvamVjdFwiKTtcbiAgY29uc3QgbmV3VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFza1wiKTtcbiAgY29uc3QgcHJvamVjdE9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtb3B0aW9uc1wiKTtcblxuICAvL3JlbmRlcnMgdGFza3MgYW5kIGZpbHRlcnMgb3V0IHRhc2tzKHRvZGF5LCB3ZWVrKVxuICBob21lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyKFwiSG9tZVwiKTtcbiAgICBjbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgIGFwcC5ncmFiVGFza0RhdGEoKTtcbiAgfSk7XG5cbiAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICB3ZWVrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgLy90cmlnZ2VycyBuZXdQcm9qZWN0TW9kYWwgd2hlbiArIG5ldyBwcm9qZWN0IGJ1dHRvbiBpcyBwcmVzc2VkIG9uIHNpZGUgcGFuZWxcbiAgc2lkZVBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgXG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5wcm9qZWN0XCIpKSB7XG4gICAgICBjbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgICAgYXBwLmZpbHRlclRhc2soZS50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICB9XG4gIH0pXG5cbiAgbWFpblBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKFwiI2FkZC10YXNrXCIpKSB0cmlnZ2VyTW9kYWxDb250YWluZXIobmV3VGFza01vZGFsKTtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKFwiLnRhc2tcIikpIGVkaXRUYXNrKCk7XG4gIH0pXG5cbiAgbmV3VGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGlmKGUudGFyZ2V0ID09PSBuZXdUYXNrTW9kYWwpIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKFwiLmNsb3NlLW5ldy10YXNrXCIpKSBuZXdUYXNrTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gIH0pO1xuXG4gIG5ld1Byb2plY3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZihlLnRhcmdldCA9PT0gbmV3UHJvamVjdE1vZGFsKSBuZXdQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctcHJvamVjdFwiKSkgbmV3UHJvamVjdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuXG4gIC8vbWFpbiBwYWdlIGV2ZW50IGxpc3RlbmVyc1xuICB0YXNrQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldC5tYXRjaGVzKCcjZGVsZXRlLXRhc2snKSkge1xuICAgICAgY29uc3QgdGFza0luZGV4ID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmRhdGFzZXQuaW5kZXg7XG4gICAgICBkYXRhQmFzZS5kZWxldGVUYXNrKHRhc2tJbmRleClcbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHVlLWRhdGVcIikudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtb3B0aW9uc1wiKS52YWx1ZTtcbiAgICBhcHAubG9hZFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBhcHAubG9hZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gIH0pXG5cbiAgY29uc3QgdHJpZ2dlck1vZGFsQ29udGFpbmVyID0gbW9kYWwgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyID0gKGhlYWRpbmcpID0+IHtcbiAgICAvLyBtYWluUGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgPGgyPiR7aDJ9PC9oMj5cbiAgICAvLyAgIDxkaXYgaWQ9XCJhZGQtdGFza1wiIGNsYXNzPVwidGFza1wiPisgQWRkIFRhc2s8L2Rpdj5cbiAgICAvLyBgO1xuICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gaGVhZGluZztcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGFkZFRhc2suc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhZGQtdGFza1wiKTtcbiAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgICBhZGRUYXNrLmlubmVyVGV4dCA9IFwiKyBBZGQgVGFza1wiO1xuICAgIG1haW5QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChoMik7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChhZGRUYXNrKTtcbiAgICAvLyBoMi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRUYXNrLCBoMi5uZXh0U2libGluZyk7XG5cbiAgfVxuICBcbiAgY29uc3QgdGFzayA9ICh0aXRsZSwgaW5kZXgsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIilcbiAgICAgIHRhc2suaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICA8cD4ke3RpdGxlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHA+JHtkdWVEYXRlfTwvcD5cbiAgICAgIDxzcGFuIGlkPVwiZGVsZXRlLXRhc2tcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgICAgIC8vIHRhc2tDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRhc2ssIHRhc2tDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dFNpYmxpbmcpO1xuICB9XG5cbiAgLy8gY29uc3QgZWRpdFRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAvLyB9XG5cbiAgY29uc3QgYWRkUHJvamVjdE9wdGlvbnMgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvamVjdCk7XG4gICAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICAgIHByb2plY3RPcHRpb25zLmFwcGVuZENoaWxkKG9wdGlvbik7XG5cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSAodGl0bGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGluZGV4KTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gYFxuICAgICAgICA8cD4ke3RpdGxlfTwvcD5cblxuICAgICAgYDtcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IHZpZXdUYXNrID0gKCkgPT4ge1xuICAgIFxuICB9XG5cbiAgY29uc3QgZWRpdFRhc2sgPSAoKSA9PiB7XG4gICAgXG4gIH1cblxuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoY29udGVudFR5cGUpID0+IHtcbiAgICBzd2l0Y2goY29udGVudFR5cGUpIHtcbiAgICAgIGNhc2UgXCJ0YXNrQ29udGFpbmVyXCI6XG4gICAgICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvamVjdE9wdGlvbnNcIjpcbiAgICAgICAgcHJvamVjdE9wdGlvbnMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvamVjdExpc3RcIjpcbiAgICAgICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgXG4gIH1cbiAgXG4gIHJldHVybiB7IHJlbmRlciwgdGFzaywgcHJvamVjdCwgY2xlYXJDb250ZW50LCBhZGRQcm9qZWN0T3B0aW9ucyB9XG59KSgpO1xuXG4vL21hZ2ljIHN0dWZmIGhhcHBlbnMgaGVyZVxuY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBsb2FkVGFzayA9ICh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAgIHB1c2hUYXNrKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgIGdyYWJUYXNrRGF0YSgpO1xuIFxuICAgIGNvbnNvbGUubG9nKGRhdGFCYXNlLnRhc2tEYXRhKTtcbiAgfVxuXG4gIGNvbnN0IHB1c2hUYXNrID0gKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICB9XG5cbiAgY29uc3QgZ3JhYlRhc2tEYXRhID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnRhc2tEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi50YXNrKGl0ZW0udGl0bGUsIGRhdGFCYXNlLnRhc2tEYXRhLmluZGV4T2YoaXRlbSksIGl0ZW0uZHVlRGF0ZSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRQcm9qZWN0ID0gKHRpdGxlKSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFByb2plY3QodGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKGRhdGFCYXNlLnByb2plY3REYXRhKTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudChcInByb2plY3RMaXN0XCIpXG4gICAgZ3JhYlByb2plY3REYXRhKCk7XG4gIH1cblxuICBjb25zdCBncmFiUHJvamVjdERhdGEgPSAoKSA9PiB7XG4gICAgZGF0YUJhc2UucHJvamVjdERhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnByb2plY3QoaXRlbS50aXRsZSwgZGF0YUJhc2UucHJvamVjdERhdGEuaW5kZXhPZihpdGVtKSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGZpbHRlclRhc2sgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICBjb25zdCBmaWx0ZXJlZFRhc2tzID0gZGF0YUJhc2UudGFza0RhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wcm9qZWN0ID09PSBwcm9qZWN0VGl0bGUpO1xuICAgIGZpbHRlcmVkVGFza3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnRhc2soaXRlbS50aXRsZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSwgaXRlbS5kdWVEYXRlKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgZG9tU3R1ZmYuY2xlYXJDb250ZW50KFwicHJvamVjdE9wdGlvbnNcIilcbiAgICBkYXRhQmFzZS5wcm9qZWN0RGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgZG9tU3R1ZmYuYWRkUHJvamVjdE9wdGlvbnMoaXRlbS50aXRsZSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHNvcnRCeVdlZWsgPSAoKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IHNvcnRCeVRvZGF5ID0gKCkgPT4ge1xuICAgIFxuICB9XG5cbiAgY29uc3QgcmVmcmVzaFByb2plY3RzID0gKCkgPT4ge1xuXG4gIH1cblxuICBjb25zdCBlZGl0VGFzayA9ICgpID0+IHtcblxuICB9XG4gIC8vIGFkZCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggdGFza0RhdGEgYW5kIHJlbmRlcnMgY29udGVudCBvbiBwYWdlLCBpZiBjb250ZW50IGlzIHRvIGJlIHJlbmRlcmVkIG9uIGEgcHJvamVjdCwgZmlsdGVyIG91dCBvYmplY3RzIGluIHRhc2tEYXRhIHRoYXQgY29udGFpbiB0aGUgY29ycmVzcG9uZGluZyBwcm9qZWN0IG5hbWUuIFxuXG4gIC8vIHdlZWtseS90b2RheSBmdW5jdGlvbiB0aGF0IGZpbHRlcnMgb3V0IHRhc2tEYXRhIGJhc2VkIG9uIGR1ZSBkYXRlXG5cbiAgLy8gcHJvamVjdCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggcHJvamVjdERhdGEgYW5kIHJlZnJlc2hlcyBwcm9qZWN0cyBvbiBwYWdlICh3aGVuIHVzZXIgZGVsZXRlcyBwcm9qZWN0KVxuXG4gIC8vIHdoZW4gdXNlciBkZWxldGVzIGEgcHJvamVjdCBydW4gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGluIHByb2plY3QgbmFtZSBhcyBhIHBhcmFtZXRlciwgbG9vcCB0aHJvdWdoIHRhc2tEYXRhIGFuZCBkZWxldGUgdGFza3Mgd2l0aCBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZVxuXG4gIHJldHVybiB7IGxvYWRUYXNrLCBsb2FkUHJvamVjdCwgZ3JhYlByb2plY3REYXRhLCBncmFiVGFza0RhdGEsIGZpbHRlclRhc2ssIGFkZFByb2plY3RPcHRpb25zIH1cbn0pKCk7XG5cbmNvbnNvbGUubG9nKGRhdGFCYXNlLnByb2plY3REYXRhKTsiXSwic291cmNlUm9vdCI6IiJ9