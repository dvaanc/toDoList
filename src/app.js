import { domStuff } from './DOM';
import { taskFactory, projectFactory, dataBase } from './dataBase';
import { isToday, isThisWeek, toDate } from 'date-fns';
import { is } from 'date-fns/locale';
import database from 'mime-db';

dataBase.loadLocalStorage();

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
      domStuff.addProjectOptions(item.title);
    })
  }
  const addViewProjectOptions = () => {
    domStuff.clearContent("viewTaskProjects")
    domStuff.addViewProjectOptions("N/A")
    dataBase.projectData.forEach(item => {
      domStuff.addViewProjectOptions(item.title);
    })
  }

  const sortByWeek = () => {
    const week = dataBase.taskData.filter(item => {
      const date = toDate(new Date(item.dueDate));
      return isThisWeek(date);
    })
    week.forEach(item => domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate));
  }

  const sortByToday = () => {
    const today = dataBase.taskData.filter(item => {
      const date = toDate(new Date(item.dueDate));
      return isToday(date);
    })
    today.forEach(item => domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate));
  }

  const editTask = (index, title, description, dueDate, priority, project) => {
    dataBase.taskData[index].title = title;
    dataBase.taskData[index].description = description;
    dataBase.taskData[index].dueDate = dueDate;
    dataBase.taskData[index].priority = priority;
    dataBase.taskData[index].project = project;
    grabTaskData();
    
  }

  return { loadTask, loadProject, grabProjectData, grabTaskData, filterTask, addProjectOptions, sortByWeek, sortByToday, addViewProjectOptions, editTask }
})();



export { app }

/*
local storage shenanigans 

*/