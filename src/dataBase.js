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
const localStorage = window.localStorage;
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
  const setTaskData = () => {
    localStorage.setItem('taskData', JSON.stringify(taskData));
}
  const setProjectData = () => {
    localStorage.setItem('projectData', JSON.stringify(projectData))
  }

  const loadLocalStorage = () => {
    taskData = JSON.parse(localStorage.getItem("taskData"));
    projectData = JSON.parse(localStorage.getItem("projectData"));
    console.log(taskData, projectData)
    if(taskData && projectData === null) {
      setTaskData();
      setProjectData();
    }
    console.log(localStorage)
  }


  return { pushTask, pushProject, taskData, projectData , deleteTask, deleteProject, loadLocalStorage,};
})();






export { taskFactory, projectFactory, dataBase };
