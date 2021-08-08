import { app } from './app';
import { domStuff } from './DOM';

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
  const saveTaskData = () => {
    localStorage.setItem('taskData', JSON.stringify(taskData));
}
  const saveProjectData = () => {
    localStorage.setItem('projectData', JSON.stringify(projectData))
  }

  const loadLocalStorage = () => {
    const taskJSON = JSON.parse(localStorage.getItem("taskData"));
    const projectJSON = JSON.parse(localStorage.getItem("projectData"));

    if(taskJSON === null) saveTaskData();
    if(projectJSON === null) saveProjectData();
    
    taskJSON.forEach(task => taskData.push(task))
    projectJSON.forEach(project => projectData.push(project))
  }


  return { pushTask, pushProject, taskData, projectData , deleteTask, deleteProject, loadLocalStorage, saveTaskData, saveProjectData };
})();

export { taskFactory, projectFactory, dataBase };
