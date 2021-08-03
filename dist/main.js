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

  //modal that pops up when a task is clicked
  const viewTaskModal = document.querySelector(".view-task");
  const viewTaskTitle = document.querySelector("#view-task-title");
  const viewTaskDueDate = document.querySelector("#view-task-dueDate");
  const viewTaskProject = document.querySelector("#view-task-project");
  const viewTaskDescription = document.querySelector("#view-task-description");
  const viewTaskPriority = document.querySelector("#view-task-priority");

  const viewTask = (task) => {
    clearContent("viewTask");
    const index = task
    const data = dataBase.taskData[index];
    viewTaskTitle.innerText = data.title;
    viewTaskDescription.innerText = data.description;
    viewTaskDueDate.innerText = data.dueDate;
    viewTaskPriority.innerText = data.priority;
    viewTaskProject.innerText = data.project;
    viewTaskModal.classList.add("show");
  }


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
    if(e.target.matches(".task")) viewTask(e.target.dataset.index);
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
      addTask.classList.add("add-task");
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
      task.dataset.index = index;
      task.innerHTML = `
      <div>
      <input type="checkbox" name="" >
      <p>${title}</p>
    </div>
    <div>
      <p>${dueDate}</p>
      <img src="images/edit.png" id="edit-task">
      <img src="images/trash.png" id="delete-task">
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
      case "viewTask":
        viewTaskTitle.innerText = "";
        viewTaskDueDate.innerText = "";
        viewTaskProject.innerText = "";
        viewTaskDescription.innerText = "";
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
    domStuff.addProjectOptions("N/A")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLEdBQUc7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxNQUFNOztBQUV2QztBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVELGtDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ZhY3RvcnkgZnVuYyB0aGF0IG1ha2VzIHRvLWRvc1xuY29uc3QgdGFza0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICBjb25zdCB0YXNrID0ge1xuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLCBcbiAgICBkdWVEYXRlLCBcbiAgICBwcmlvcml0eSwgXG4gICAgcHJvamVjdFxuICB9XG5cbiAgcmV0dXJuIHRhc2s7XG59O1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9ICh0aXRsZSkgPT4ge1xuICByZXR1cm4geyB0aXRsZSB9O1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2godGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9ICh0aXRsZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh0aXRsZSk7XG4gICAgcHJvamVjdERhdGEucHVzaChwcm9qZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZVRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICB0YXNrRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChpbmRleCkgPT4ge1xuICAgIHByb2plY3REYXRhLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICByZXR1cm4geyBwdXNoVGFzaywgcHVzaFByb2plY3QsIHRhc2tEYXRhLCBwcm9qZWN0RGF0YSAsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3R9O1xufSkoKTtcblxuLy9yZXNwb25zaWJsZSBmb3IgbWFuaXB1bGF0aW5nIHRoZSBkb21cbmNvbnN0IGRvbVN0dWZmID0gKGZ1bmN0aW9uKCkge1xuICAvL3NpZGUgcGFuZWxcbiAgY29uc3Qgc2lkZVBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlLXBhbmVsXCIpO1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0LWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdQcm9qZWN0TW9kYWwpO1xuICB9KVxuICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGFwcC5hZGRQcm9qZWN0T3B0aW9ucygpO1xuICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdUYXNrTW9kYWwpO1xuICB9KVxuICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctcHJvamVjdFwiKTtcbiAgLy9tYWluIHBhbmVsIFxuICBjb25zdCBtYWluUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tcGFuZWxcIik7XG4gIGNvbnN0IHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1saXN0XCIpXG4gIC8vbW9kYWxzIHRoYXQgcG9wdXAgd2hlbiBjbGlja2VkIFxuICBjb25zdCBuZXdQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy1wcm9qZWN0XCIpO1xuICBjb25zdCBuZXdUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrXCIpO1xuICBjb25zdCBwcm9qZWN0T3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1vcHRpb25zXCIpO1xuXG4gIC8vbW9kYWwgdGhhdCBwb3BzIHVwIHdoZW4gYSB0YXNrIGlzIGNsaWNrZWRcbiAgY29uc3Qgdmlld1Rhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmlldy10YXNrXCIpO1xuICBjb25zdCB2aWV3VGFza1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN2aWV3LXRhc2stdGl0bGVcIik7XG4gIGNvbnN0IHZpZXdUYXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlldy10YXNrLWR1ZURhdGVcIik7XG4gIGNvbnN0IHZpZXdUYXNrUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlldy10YXNrLXByb2plY3RcIik7XG4gIGNvbnN0IHZpZXdUYXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZXctdGFzay1kZXNjcmlwdGlvblwiKTtcbiAgY29uc3Qgdmlld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlldy10YXNrLXByaW9yaXR5XCIpO1xuXG4gIGNvbnN0IHZpZXdUYXNrID0gKHRhc2spID0+IHtcbiAgICBjbGVhckNvbnRlbnQoXCJ2aWV3VGFza1wiKTtcbiAgICBjb25zdCBpbmRleCA9IHRhc2tcbiAgICBjb25zdCBkYXRhID0gZGF0YUJhc2UudGFza0RhdGFbaW5kZXhdO1xuICAgIHZpZXdUYXNrVGl0bGUuaW5uZXJUZXh0ID0gZGF0YS50aXRsZTtcbiAgICB2aWV3VGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IGRhdGEuZGVzY3JpcHRpb247XG4gICAgdmlld1Rhc2tEdWVEYXRlLmlubmVyVGV4dCA9IGRhdGEuZHVlRGF0ZTtcbiAgICB2aWV3VGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IGRhdGEucHJpb3JpdHk7XG4gICAgdmlld1Rhc2tQcm9qZWN0LmlubmVyVGV4dCA9IGRhdGEucHJvamVjdDtcbiAgICB2aWV3VGFza01vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cblxuICAvL3JlbmRlcnMgdGFza3MgYW5kIGZpbHRlcnMgb3V0IHRhc2tzKHRvZGF5LCB3ZWVrKVxuICBob21lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2xlYXJDb250ZW50KFwidGFza0NvbnRhaW5lclwiKTtcbiAgICBjbGVhckNvbnRlbnQoXCJtYWluUGFuZWxcIik7XG4gICAgcmVuZGVyKFwiSG9tZVwiKTtcbiAgICBhcHAuZ3JhYlRhc2tEYXRhKCk7XG4gIH0pO1xuXG4gIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgd2Vlay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIC8vdHJpZ2dlcnMgbmV3UHJvamVjdE1vZGFsIHdoZW4gKyBuZXcgcHJvamVjdCBidXR0b24gaXMgcHJlc3NlZCBvbiBzaWRlIHBhbmVsXG4gIHNpZGVQYW5lbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5wcm9qZWN0XCIpIHx8IGUudGFyZ2V0Lm1hdGNoZXMoXCIucHJvamVjdFRleHRcIikpIHtcbiAgICAgIGNsZWFyQ29udGVudChcInRhc2tDb250YWluZXJcIik7XG4gICAgICBjbGVhckNvbnRlbnQoXCJtYWluUGFuZWxcIik7XG4gICAgICByZW5kZXIoZS50YXJnZXQuaW5uZXJUZXh0KTtcbiAgICAgIGFwcC5maWx0ZXJUYXNrKGUudGFyZ2V0LmlubmVyVGV4dCk7XG4gICAgfVxuICB9KVxuXG4gIG1haW5QYW5lbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIiNhZGQtdGFza1wiKSkgdHJpZ2dlck1vZGFsQ29udGFpbmVyKG5ld1Rhc2tNb2RhbCk7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi50YXNrXCIpKSB2aWV3VGFzayhlLnRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgfSlcblxuICBuZXdUYXNrTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYoZS50YXJnZXQgPT09IG5ld1Rhc2tNb2RhbCkgbmV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2UtbmV3LXRhc2tcIikpIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgbmV3UHJvamVjdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldCA9PT0gbmV3UHJvamVjdE1vZGFsKSBuZXdQcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgaWYoZS50YXJnZXQubWF0Y2hlcyhcIi5jbG9zZS1uZXctcHJvamVjdFwiKSkgbmV3UHJvamVjdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KTtcblxuICB2aWV3VGFza01vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBpZihlLnRhcmdldCA9PSB2aWV3VGFza01vZGFsKSB2aWV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIuY2xvc2Utdmlldy10YXNrXCIpKSB2aWV3VGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICB9KVxuXG5cbiAgLy9tYWluIHBhZ2UgZXZlbnQgbGlzdGVuZXJzXG4gIHRhc2tDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoJyNkZWxldGUtdGFzaycpKSB7XG4gICAgICBjb25zdCB0YXNrSW5kZXggPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgICAgIGRhdGFCYXNlLmRlbGV0ZVRhc2sodGFza0luZGV4KVxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgIH1cbiAgfSlcblxuICBcbiAgY29uc3QgbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay10aXRsZVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHVlLWRhdGVcIikudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtb3B0aW9uc1wiKS52YWx1ZTtcbiAgICBhcHAubG9hZFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIG5ld1Rhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgfSk7XG5cbiAgY29uc3QgbmV3UHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1wcm9qZWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10aXRsZVwiKS52YWx1ZTtcbiAgICBhcHAubG9hZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBhcHAuYWRkUHJvamVjdE9wdGlvbnMoKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gIH0pXG5cbiAgY29uc3QgdHJpZ2dlck1vZGFsQ29udGFpbmVyID0gbW9kYWwgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG5cbiAgY29uc3QgcmVuZGVyID0gKGhlYWRpbmcpID0+IHtcbiAgICAvLyBtYWluUGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgPGgyPiR7aDJ9PC9oMj5cbiAgICAvLyAgIDxkaXYgaWQ9XCJhZGQtdGFza1wiIGNsYXNzPVwidGFza1wiPisgQWRkIFRhc2s8L2Rpdj5cbiAgICAvLyBgO1xuICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgaDIuaW5uZXJUZXh0ID0gaGVhZGluZztcbiAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGFkZFRhc2suc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhZGQtdGFza1wiKTtcbiAgICAgIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcImFkZC10YXNrXCIpO1xuICAgICAgYWRkVGFzay5pbm5lclRleHQgPSBcIisgQWRkIFRhc2tcIjtcbiAgICBtYWluUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQoaDIpO1xuICAgIG1haW5QYW5lbC5hcHBlbmRDaGlsZCh0YXNrQ29udGFpbmVyKTtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQoYWRkVGFzayk7XG4gICAgLy8gaDIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkVGFzaywgaDIubmV4dFNpYmxpbmcpO1xuXG4gIH1cbiAgXG4gIGNvbnN0IHRhc2sgPSAodGl0bGUsIGluZGV4LCBkdWVEYXRlKSA9PiB7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpXG4gICAgICB0YXNrLmRhdGFzZXQuaW5kZXggPSBpbmRleDtcbiAgICAgIHRhc2suaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgPlxuICAgICAgPHA+JHt0aXRsZX08L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxwPiR7ZHVlRGF0ZX08L3A+XG4gICAgICA8aW1nIHNyYz1cImltYWdlcy9lZGl0LnBuZ1wiIGlkPVwiZWRpdC10YXNrXCI+XG4gICAgICA8aW1nIHNyYz1cImltYWdlcy90cmFzaC5wbmdcIiBpZD1cImRlbGV0ZS10YXNrXCI+XG4gICAgICA8L2Rpdj5cbiAgICAgIGA7XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2spO1xuICAgICAgLy8gdGFza0NvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFzaywgdGFza0NvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0U2libGluZyk7XG4gIH1cblxuICAvLyBjb25zdCBlZGl0VGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIH1cblxuICBjb25zdCBhZGRQcm9qZWN0T3B0aW9ucyA9IChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBwcm9qZWN0KTtcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgICAgcHJvamVjdE9wdGlvbnMuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9ICh0aXRsZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG4gICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgaW5kZXgpO1xuICAgICAgcHJvamVjdC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxwIGNsYXNzPVwicHJvamVjdFRleHRcIj4ke3RpdGxlfTwvcD5cblxuICAgICAgYDtcbiAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgfVxuXG5cblxuICBjb25zdCBlZGl0VGFzayA9ICgpID0+IHtcbiAgICBcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQ29udGVudCA9IChjb250ZW50VHlwZSkgPT4ge1xuICAgIHN3aXRjaChjb250ZW50VHlwZSkge1xuICAgICAgY2FzZSBcIm1haW5QYW5lbFwiOlxuICAgICAgICBtYWluUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidGFza0NvbnRhaW5lclwiOlxuICAgICAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2plY3RPcHRpb25zXCI6XG4gICAgICAgIHByb2plY3RPcHRpb25zLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2plY3RMaXN0XCI6XG4gICAgICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInZpZXdUYXNrXCI6XG4gICAgICAgIHZpZXdUYXNrVGl0bGUuaW5uZXJUZXh0ID0gXCJcIjtcbiAgICAgICAgdmlld1Rhc2tEdWVEYXRlLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgIHZpZXdUYXNrUHJvamVjdC5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgICB2aWV3VGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgfTtcbiAgXG4gIH1cbiAgXG4gIHJldHVybiB7IHJlbmRlciwgdGFzaywgcHJvamVjdCwgY2xlYXJDb250ZW50LCBhZGRQcm9qZWN0T3B0aW9ucyB9XG59KSgpO1xuXG4vL21hZ2ljIHN0dWZmIGhhcHBlbnMgaGVyZVxuY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBsb2FkVGFzayA9ICh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICAgIHB1c2hUYXNrKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgIGdyYWJUYXNrRGF0YSgpO1xuIFxuICAgIGNvbnNvbGUubG9nKGRhdGFCYXNlLnRhc2tEYXRhKTtcbiAgfVxuXG4gIGNvbnN0IHB1c2hUYXNrID0gKHRhc2tUaXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFRhc2sodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICB9XG5cbiAgY29uc3QgZ3JhYlRhc2tEYXRhID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnRhc2tEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi50YXNrKGl0ZW0udGl0bGUsIGRhdGFCYXNlLnRhc2tEYXRhLmluZGV4T2YoaXRlbSksIGl0ZW0uZHVlRGF0ZSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRQcm9qZWN0ID0gKHRpdGxlKSA9PiB7XG4gICAgZGF0YUJhc2UucHVzaFByb2plY3QodGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKGRhdGFCYXNlLnByb2plY3REYXRhKTtcbiAgICBkb21TdHVmZi5jbGVhckNvbnRlbnQoXCJ0YXNrQ29udGFpbmVyXCIpO1xuICAgIGRvbVN0dWZmLmNsZWFyQ29udGVudChcInByb2plY3RMaXN0XCIpXG4gICAgZ3JhYlByb2plY3REYXRhKCk7XG4gIH1cblxuICBjb25zdCBncmFiUHJvamVjdERhdGEgPSAoKSA9PiB7XG4gICAgZGF0YUJhc2UucHJvamVjdERhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnByb2plY3QoaXRlbS50aXRsZSwgZGF0YUJhc2UucHJvamVjdERhdGEuaW5kZXhPZihpdGVtKSk7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGZpbHRlclRhc2sgPSAocHJvamVjdFRpdGxlKSA9PiB7XG4gICBjb25zdCBmaWx0ZXJlZFRhc2tzID0gZGF0YUJhc2UudGFza0RhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wcm9qZWN0ID09PSBwcm9qZWN0VGl0bGUpO1xuICAgIGZpbHRlcmVkVGFza3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRvbVN0dWZmLnRhc2soaXRlbS50aXRsZSwgZGF0YUJhc2UudGFza0RhdGEuaW5kZXhPZihpdGVtKSwgaXRlbS5kdWVEYXRlKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgYWRkUHJvamVjdE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgZG9tU3R1ZmYuY2xlYXJDb250ZW50KFwicHJvamVjdE9wdGlvbnNcIik7XG4gICAgZG9tU3R1ZmYuYWRkUHJvamVjdE9wdGlvbnMoXCJOL0FcIilcbiAgICBkYXRhQmFzZS5wcm9qZWN0RGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc29sZS5sb2coaXRlbS50aXRsZSk7XG4gICAgICBkb21TdHVmZi5hZGRQcm9qZWN0T3B0aW9ucyhpdGVtLnRpdGxlKTtcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc29ydEJ5V2VlayA9ICgpID0+IHtcblxuICB9XG5cbiAgY29uc3Qgc29ydEJ5VG9kYXkgPSAoKSA9PiB7XG4gICAgXG4gIH1cblxuICBjb25zdCByZWZyZXNoUHJvamVjdHMgPSAoKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xuXG4gIH1cbiAgLy8gYWRkIGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCB0YXNrRGF0YSBhbmQgcmVuZGVycyBjb250ZW50IG9uIHBhZ2UsIGlmIGNvbnRlbnQgaXMgdG8gYmUgcmVuZGVyZWQgb24gYSBwcm9qZWN0LCBmaWx0ZXIgb3V0IG9iamVjdHMgaW4gdGFza0RhdGEgdGhhdCBjb250YWluIHRoZSBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZS4gXG5cbiAgLy8gd2Vla2x5L3RvZGF5IGZ1bmN0aW9uIHRoYXQgZmlsdGVycyBvdXQgdGFza0RhdGEgYmFzZWQgb24gZHVlIGRhdGVcblxuICAvLyBwcm9qZWN0IGZ1bmN0aW9uIHRoYXQgbG9vcHMgdGhyb3VnaCBwcm9qZWN0RGF0YSBhbmQgcmVmcmVzaGVzIHByb2plY3RzIG9uIHBhZ2UgKHdoZW4gdXNlciBkZWxldGVzIHByb2plY3QpXG5cbiAgLy8gd2hlbiB1c2VyIGRlbGV0ZXMgYSBwcm9qZWN0IHJ1biBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gcHJvamVjdCBuYW1lIGFzIGEgcGFyYW1ldGVyLCBsb29wIHRocm91Z2ggdGFza0RhdGEgYW5kIGRlbGV0ZSB0YXNrcyB3aXRoIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBuYW1lXG5cbiAgcmV0dXJuIHsgbG9hZFRhc2ssIGxvYWRQcm9qZWN0LCBncmFiUHJvamVjdERhdGEsIGdyYWJUYXNrRGF0YSwgZmlsdGVyVGFzaywgYWRkUHJvamVjdE9wdGlvbnMgfVxufSkoKTtcblxuY29uc29sZS5sb2coZGF0YUJhc2UucHJvamVjdERhdGEpOyJdLCJzb3VyY2VSb290IjoiIn0=