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

export { taskFactory, projectFactory, dataBase };
