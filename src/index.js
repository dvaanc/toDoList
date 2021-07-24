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
