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
  const viewTaskModal = document.querySelector("#view-task");

  //renders tasks and filters out tasks(today, week)
  home.addEventListener("click", () => {
    clearContent("taskContainer");
    clearContent("mainPanel");
    render("Home");
    app.grabTaskData();
  });

  today.addEventListener("click", () => {

  });

  week.addEventListener("click", () => {

  });

  //triggers newProjectModal when + new project button is pressed on side panel
  sidePanel.addEventListener("click", e => {
    if(e.target.matches(".project") || e.target.matches(".projectText")) {
      clearContent("taskContainer");
      clearContent("mainPanel");
      render(e.target.innerText);
      app.filterTask(e.target.innerText);
    }
  })

  mainPanel.addEventListener("click", e => {
    if(e.target.matches("#add-task")) triggerModalContainer(newTaskModal);
    if(e.target.matches(".task")) viewTask();
  })

  newTaskModal.addEventListener("click", (e) => {
    if(e.target === newTaskModal) newTaskModal.classList.remove("show");
    if(e.target.matches(".close-new-task")) newTaskModal.classList.remove("show");
  });

  newProjectModal.addEventListener("click", e => {
    if(e.target === newProjectModal) newProjectModal.classList.remove("show");
    if(e.target.matches(".close-new-project")) newProjectModal.classList.remove("show");
  });

  viewTaskModal.addEventListener("click", e => {
    if(e.target == viewTaskModal) viewTaskModal.classList.remove("show");
    if(e.target.matches(".close-view-task")) viewTaskModal.classList.remove("show");
  })
  const viewTask = () => {
    
  }


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
    app.addProjectOptions();
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
        <p class="projectText">${title}</p>

      `;
    projectList.appendChild(project);
  }



  const editTask = () => {
    
  }

  const clearContent = (contentType) => {
    switch(contentType) {
      case "mainPanel":
        mainPanel.innerHTML = "";
        break;
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
    domStuff.clearContent("projectOptions");
    dataBase.projectData.forEach(item => {
      console.log(item.title);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RCxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxNQUFNOztBQUV2QztBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELGtDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ZhY3RvcnkgZnVuYyB0aGF0IG1ha2VzIHRvLWRvc1xuY29uc3QgdGFza0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICBjb25zdCB0YXNrID0ge1xuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLCBcbiAgICBkdWVEYXRlLCBcbiAgICBwcmlvcml0eSwgXG4gICAgcHJvamVjdFxuICB9XG5cbiAgcmV0dXJuIHRhc2s7XG59O1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9ICh0aXRsZSkgPT4ge1xuICByZXR1cm4geyB0aXRsZSB9O1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2godGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh0aXRsZSk7XG4gICAgcHJvamVjdERhdGEucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChpbmRleCkgPT4ge1xuICAgIHByb2plY3REYXRhLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICByZXR1cm4geyBwdXNoVGFzaywgcHVzaFByb2plY3QsIHRhc2tEYXRhLCBwcm9qZWN0RGF0YSAsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3R9O1xufSkoKTtcblxuLy9yZXNwb25zaWJsZSBmb3IgbWFuaXB1bGF0aW5nIHRoZSBkb21cbmNvbnN0IGRvbVN0dWZmID0gKGZ1bmN0aW9uKCkge1xuICAvL3NpZGUgcGFuZWxcbiAgY29uc3Qgc2lkZVBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLXBhbmVsXCIpO1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0LWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdQcm9qZWN0TW9kYWwpO1xuICB9KVxuICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGFwcC5hZGRQcm9qZWN0T3B0aW9ucygpO1xuICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdUYXNrTW9kYWwpO1xuICB9KVxuICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctcHJvamVjdFwiKTtcbiAgLy9tYWluIHBhbmVsIFxuICBjb25zdCBtYWluUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcGFuZWxcIik7XG4gIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1saXN0XCIpXG4gIC8vbW9kYWxzIHRoYXQgcG9wdXAgd2hlbiBjbGlja2VkIFxuICBjb25zdCBuZXdQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy1wcm9qZWN0XCIpO1xuICBjb25zdCBuZXdUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrXCIpO1xuICBjb25zdCBwcm9qZWN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1vcHRpb25zXCIpO1xuICBjb25zdCB2aWV3VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWV3LXRhc2tcIik7XG5cbiAgLy9yZW5kZXJzIHRhc2tzIGFuZCBmaWx0ZXJzIG91dCB0YXNrcyh0b2RheSwgd2VlaylcbiAgaG9tZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNsZWFyQ29udGVudChcInRhc2tDb250YWluZXJcIik7XG4gICAgY2xlYXJDb250ZW50KFwibWFpblBhbmVsXCIpO1xuICAgIHJlbmRlcihcIkhvbWVcIik7XG4gICAgYXBwLmdyYWJUYXNrRGF0YSgpO1xuICB9KTtcblxuICB0b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIHdlZWsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICAvL3RyaWdnZXJzIG5ld1Byb2plY3RNb2RhbCB3aGVuICsgbmV3IHByb2plY3QgYnV0dG9uIGlzIHByZXNzZWQgb24gc2lkZSBwYW5lbFxuICBzaWRlUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIucHJvamVjdFwiKSB8fCBlLnRhcmdldC5tYXRjaGVzKFwiLnByb2plY3RUZXh0XCIpKSB7XG4gICAgICBjbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgICAgY2xlYXJDb250ZW50KFwibWFpblBhbmVsXCIpO1xuICAgICAgcmVuZGVyKGUudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgICBhcHAuZmlsdGVyVGFzayhlLnRhcmdldC5pbm5lclRleHQpO1xuICAgIH1cbiAgfSlcblxuICBtYWluUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjYWRkLXRhc2tcIikpIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdUYXNrTW9kYWwpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIudGFza1wiKSkgdmlld1Rhc2soKTtcbiAgfSlcblxuICBuZXdUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYoZS50YXJnZXQgPT09IG5ld1Rhc2tNb2RhbCkgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2UtbmV3LXRhc2tcIikpIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgbmV3UHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldCA9PT0gbmV3UHJvamVjdE1vZGFsKSBuZXdQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctcHJvamVjdFwiKSkgbmV3UHJvamVjdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICB2aWV3VGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldCA9PSB2aWV3VGFza01vZGFsKSB2aWV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2Utdmlldy10YXNrXCIpKSB2aWV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KVxuICBjb25zdCB2aWV3VGFzayA9ICgpID0+IHtcbiAgICBcbiAgfVxuXG5cbiAgLy9tYWluIHBhZ2UgZXZlbnQgbGlzdGVuZXJzXG4gIHRhc2tDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoJyNkZWxldGUtdGFzaycpKSB7XG4gICAgICBjb25zdCB0YXNrSW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIGRhdGFCYXNlLmRlbGV0ZVRhc2sodGFza0luZGV4KVxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgIH1cbiAgfSlcblxuICBcbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHVlLWRhdGVcIikudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtb3B0aW9uc1wiKS52YWx1ZTtcbiAgICBhcHAubG9hZFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBhcHAubG9hZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBhcHAuYWRkUHJvamVjdE9wdGlvbnMoKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gIH0pXG5cbiAgY29uc3QgdHJpZ2dlck1vZGFsQ29udGFpbmVyID0gbW9kYWwgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyID0gKGhlYWRpbmcpID0+IHtcbiAgICAvLyBtYWluUGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgPGgyPiR7aDJ9PC9oMj5cbiAgICAvLyAgIDxkaXYgaWQ9XCJhZGQtdGFza1wiIGNsYXNzPVwidGFza1wiPisgQWRkIFRhc2s8L2Rpdj5cbiAgICAvLyBgO1xuICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gaGVhZGluZztcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGFkZFRhc2suc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhZGQtdGFza1wiKTtcbiAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gICAgICBhZGRUYXNrLmlubmVyVGV4dCA9IFwiKyBBZGQgVGFza1wiO1xuICAgIG1haW5QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChoMik7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKHRhc2tDb250YWluZXIpO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZChhZGRUYXNrKTtcbiAgICAvLyBoMi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRUYXNrLCBoMi5uZXh0U2libGluZyk7XG5cbiAgfVxuICBcbiAgY29uc3QgdGFzayA9ICh0aXRsZSwgaW5kZXgsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRhc2suY2xhc3NMaXN0LmFkZChcInRhc2tcIilcbiAgICAgIHRhc2suaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICA8cD4ke3RpdGxlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHA+JHtkdWVEYXRlfTwvcD5cbiAgICAgIDxzcGFuIGlkPVwiZGVsZXRlLXRhc2tcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbiAgICAgIC8vIHRhc2tDb250YWluZXIuaW5zZXJ0QmVmb3JlKHRhc2ssIHRhc2tDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dFNpYmxpbmcpO1xuICB9XG5cbiAgLy8gY29uc3QgZWRpdFRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAvLyB9XG5cbiAgY29uc3QgYWRkUHJvamVjdE9wdGlvbnMgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgcHJvamVjdCk7XG4gICAgICBvcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICAgIHByb2plY3RPcHRpb25zLmFwcGVuZENoaWxkKG9wdGlvbik7XG5cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSAodGl0bGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGluZGV4KTtcbiAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gYFxuICAgICAgICA8cCBjbGFzcz1cInByb2plY3RUZXh0XCI+JHt0aXRsZX08L3A+XG5cbiAgICAgIGA7XG4gICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gIH1cblxuXG5cbiAgY29uc3QgZWRpdFRhc2sgPSAoKSA9PiB7XG4gICAgXG4gIH1cblxuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoY29udGVudFR5cGUpID0+IHtcbiAgICBzd2l0Y2goY29udGVudFR5cGUpIHtcbiAgICAgIGNhc2UgXCJtYWluUGFuZWxcIjpcbiAgICAgICAgbWFpblBhbmVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRhc2tDb250YWluZXJcIjpcbiAgICAgICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9qZWN0T3B0aW9uc1wiOlxuICAgICAgICBwcm9qZWN0T3B0aW9ucy5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9qZWN0TGlzdFwiOlxuICAgICAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBicmVhaztcbiAgICB9O1xuICBcbiAgfVxuICBcbiAgcmV0dXJuIHsgcmVuZGVyLCB0YXNrLCBwcm9qZWN0LCBjbGVhckNvbnRlbnQsIGFkZFByb2plY3RPcHRpb25zIH1cbn0pKCk7XG5cbi8vbWFnaWMgc3R1ZmYgaGFwcGVucyBoZXJlXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGxvYWRUYXNrID0gKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgcHVzaFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudChcInRhc2tDb250YWluZXJcIik7XG4gICAgZ3JhYlRhc2tEYXRhKCk7XG4gXG4gICAgY29uc29sZS5sb2coZGF0YUJhc2UudGFza0RhdGEpO1xuICB9XG5cbiAgY29uc3QgcHVzaFRhc2sgPSAodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBkYXRhQmFzZS5wdXNoVGFzayh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gIH1cblxuICBjb25zdCBncmFiVGFza0RhdGEgPSAoKSA9PiB7XG4gICAgZGF0YUJhc2UudGFza0RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnRhc2soaXRlbS50aXRsZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSwgaXRlbS5kdWVEYXRlKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgbG9hZFByb2plY3QgPSAodGl0bGUpID0+IHtcbiAgICBkYXRhQmFzZS5wdXNoUHJvamVjdCh0aXRsZSk7XG4gICAgY29uc29sZS5sb2coZGF0YUJhc2UucHJvamVjdERhdGEpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudChcInRhc2tDb250YWluZXJcIik7XG4gICAgZG9tU3R1ZmYuY2xlYXJDb250ZW50KFwicHJvamVjdExpc3RcIilcbiAgICBncmFiUHJvamVjdERhdGEoKTtcbiAgfVxuXG4gIGNvbnN0IGdyYWJQcm9qZWN0RGF0YSA9ICgpID0+IHtcbiAgICBkYXRhQmFzZS5wcm9qZWN0RGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgZG9tU3R1ZmYucHJvamVjdChpdGVtLnRpdGxlLCBkYXRhQmFzZS5wcm9qZWN0RGF0YS5pbmRleE9mKGl0ZW0pKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgZmlsdGVyVGFzayA9IChwcm9qZWN0VGl0bGUpID0+IHtcbiAgIGNvbnN0IGZpbHRlcmVkVGFza3MgPSBkYXRhQmFzZS50YXNrRGF0YS5maWx0ZXIoaXRlbSA9PiBpdGVtLnByb2plY3QgPT09IHByb2plY3RUaXRsZSk7XG4gICAgZmlsdGVyZWRUYXNrcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgZG9tU3R1ZmYudGFzayhpdGVtLnRpdGxlLCBkYXRhQmFzZS50YXNrRGF0YS5pbmRleE9mKGl0ZW0pLCBpdGVtLmR1ZURhdGUpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBhZGRQcm9qZWN0T3B0aW9ucyA9ICgpID0+IHtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoXCJwcm9qZWN0T3B0aW9uc1wiKTtcbiAgICBkYXRhQmFzZS5wcm9qZWN0RGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc29sZS5sb2coaXRlbS50aXRsZSk7XG4gICAgICBkb21TdHVmZi5hZGRQcm9qZWN0T3B0aW9ucyhpdGVtLnRpdGxlKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc29ydEJ5V2VlayA9ICgpID0+IHtcblxuICB9XG5cbiAgY29uc3Qgc29ydEJ5VG9kYXkgPSAoKSA9PiB7XG4gICAgXG4gIH1cblxuICBjb25zdCByZWZyZXNoUHJvamVjdHMgPSAoKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xuXG4gIH1cbiAgLy8gYWRkIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0YXNrRGF0YSBhbmQgcmVuZGVycyBjb250ZW50IG9uIHBhZ2UsIGlmIGNvbnRlbnQgaXMgdG8gYmUgcmVuZGVyZWQgb24gYSBwcm9qZWN0LCBmaWx0ZXIgb3V0IG9iamVjdHMgaW4gdGFza0RhdGEgdGhhdCBjb250YWluIHRoZSBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZS4gXG5cbiAgLy8gd2Vla2x5L3RvZGF5IGZ1bmN0aW9uIHRoYXQgZmlsdGVycyBvdXQgdGFza0RhdGEgYmFzZWQgb24gZHVlIGRhdGVcblxuICAvLyBwcm9qZWN0IGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCBwcm9qZWN0RGF0YSBhbmQgcmVmcmVzaGVzIHByb2plY3RzIG9uIHBhZ2UgKHdoZW4gdXNlciBkZWxldGVzIHByb2plY3QpXG5cbiAgLy8gd2hlbiB1c2VyIGRlbGV0ZXMgYSBwcm9qZWN0IHJ1biBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gcHJvamVjdCBuYW1lIGFzIGEgcGFyYW1ldGVyLCBsb29wIHRocm91Z2ggdGFza0RhdGEgYW5kIGRlbGV0ZSB0YXNrcyB3aXRoIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBuYW1lXG5cbiAgcmV0dXJuIHsgbG9hZFRhc2ssIGxvYWRQcm9qZWN0LCBncmFiUHJvamVjdERhdGEsIGdyYWJUYXNrRGF0YSwgZmlsdGVyVGFzaywgYWRkUHJvamVjdE9wdGlvbnMgfVxufSkoKTtcblxuY29uc29sZS5sb2coZGF0YUJhc2UucHJvamVjdERhdGEpOyJdLCJzb3VyY2VSb290IjoiIn0=