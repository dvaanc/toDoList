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