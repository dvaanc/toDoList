import { app } from './app';
import { taskFactory, projectFactory, dataBase } from './dataBase';

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
  const mainPanel = document.querySelector(".main-panel");
  const taskContainer = document.querySelector(".task-container");
  const projectList = document.querySelector("#project-list")
  //modals that popup when clicked 
  const newProjectModal = document.querySelector(".new-project");
  const newTaskModal = document.querySelector(".new-task");
  const editTaskModal = document.querySelector(".edit-task");
  const projectOptions = document.querySelector("#project-options");

  //modal that pops up when a task is clicked
  const viewTaskModal = document.querySelector(".view-task");
  const viewTaskForm = document.querySelector("#view-task")
  const viewTaskTitle = document.querySelector("#view-title");
  const viewTaskDueDate = document.querySelector("#view-due-date");
  const viewTaskProjects = document.querySelector("#view-project-options");
  const viewTaskDescription = document.querySelector("#view-description");
  const viewTaskPriority = document.querySelector("#view-priority");
  let viewTaskIndex = 0;
  sidePanel.addEventListener("click", e => {
    if(e.target.matches(".project") || e.target.matches(".projectText")) {
      clearContent("taskContainer");
      clearContent("mainPanel");
      render(e.target.innerText);
      app.filterTask(e.target.innerText);
    }
  })

  home.addEventListener("click", () => {
    clearContent("taskContainer");
    clearContent("mainPanel");
    render("Home");
    app.addProjectOptions();
    app.grabTaskData();
  });

  today.addEventListener("click", () => {
    clearContent("taskContainer");
    clearContent("mainPanel");
    render("Today");
    app.addProjectOptions();
    app.sortByToday();
  });

  week.addEventListener("click", () => {
    clearContent("taskContainer");
    clearContent("mainPanel");
    render("This Week");
    app.addProjectOptions();
    app.sortByWeek();
  });

  mainPanel.addEventListener("click", e => {
    if(e.target.matches("#add-task")) {
      clearContent("newTaskForm");
      triggerModalContainer(newTaskModal);
    }
    if(e.target.matches(".task")) {
      viewTaskIndex = e.target.dataset.index;
      viewTask(e.target.dataset.index)
    }
    if(e.target.matches('#delete-task')) {
      const taskIndex = e.target.parentNode.parentNode.dataset.index;
      app.deleteTask(taskIndex);
      e.target.parentNode.parentNode.remove();
    }
    if (e.target.matches("input")) {
      e.target.checked ? e.target.parentNode.parentNode.classList.toggle("done") :  e.target.parentNode.parentNode.classList.toggle("done");
      };
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

  const newTaskForm = document.querySelector("#new-task");
    newTaskForm.addEventListener("submit", e => {
      e.preventDefault();
      const taskTitle = document.querySelector("#task-title").value;
      const description = document.querySelector("#description").value;
      const dueDate = document.querySelector("#due-date").value;
      const priority = document.querySelector("#priority").value;
      const project = document.querySelector("#project-options").value;
      app.createTask(taskTitle, description, dueDate, priority, project);
      newTaskModal.classList.remove("show");
    });

  const newProjectForm = document.querySelector("#add-project").addEventListener("submit", e => {
    e.preventDefault();
    const projectTitle = document.querySelector("#project-title").value;
    app.createProject(projectTitle);
    app.addProjectOptions();
    projectContainer.classList.remove("show");
  })

  const viewTask = (task) => {
    clearContent("viewTask");
    app.addViewProjectOptions();
    const index = task
    const data = dataBase.taskData[index];
    viewTaskTitle.value = data.title;
    viewTaskDescription.value = data.description;
    viewTaskDueDate.value = data.dueDate
    viewTaskPriority.value = data.priority;
    viewTaskProjects.value = data.project;
    viewTaskModal.classList.add("show");
  }

  viewTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    clearContent("taskContainer");
    app.editTask(viewTaskIndex, viewTaskTitle.value, viewTaskDescription.value, viewTaskDueDate.value,   
      viewTaskPriority.value, viewTaskProjects.value);
      viewTaskModal.classList.remove("show");
  })

  const triggerModalContainer = modal => {
    modal.classList.add("show");
  }

  const render = (heading) => {
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
      <p>${dueDate.split('-').reverse().join('-')}</p>
      <img src="images/trash.png" id="delete-task">
      </div>
      `;
      taskContainer.appendChild(task);
  }

  const addProjectOptions = (project) => {
    const option = document.createElement("option");
      option.setAttribute("value", project);
      option.innerText = project;
      projectOptions.appendChild(option);
  }

  const addViewProjectOptions = (project) => {
    const option = document.createElement("option");
    option.setAttribute("value", project);
    option.innerText = project;
    viewTaskProjects.appendChild(option);
  }

  const project = (title, index) => {
    const project = document.createElement("div");
      project.classList.add("project");
      project.setAttribute("data-index", index);
      project.innerHTML = `
        <p class="projectText">${title}</p>
        <img src="images/trash.png" id="delete-project">
      `;
    projectList.appendChild(project);
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
      case "viewTaskProjects":
        viewTaskProjects.innerHTML = "";
      case "viewTask":
        viewTaskForm.reset();
        break;
      case "newTaskForm":
        newTaskForm.reset();
        break;
    };
  }
  
  return { render, task, project, clearContent, addProjectOptions, addViewProjectOptions }
})();

export { domStuff };