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
