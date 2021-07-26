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

const projectFactory = (name) => {
  return name;
}



//holds all data
const dataBase = (function() {
  let taskData = [];
  let projectData = [];

  const pushTask = (title, description, dueDate, priority, project) => {
    const task = taskFactory(title, description, dueDate, priority, project);
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
  const mainPanel = document.querySelector(".main-panel");

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
    newTaskContainer.classList.remove("show");

  })


  //main page event listeners
  home.addEventListener("click", () => {
    render("Home");
    app.idk();
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
      contentContainer.insertBefore(task, contentContainer.firstElementChild.nextSibling);
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
    mainPanel.appendChild(addTask);
    // h2.parentNode.insertBefore(addTask, h2.nextSibling);

  }

  const clearContent = () => {
    contentContainer.innerHTML = "";
  }
  
  return { render, task }
})();

//magic stuff happens here
const app = (function() {
  const logic = (taskTitle, description, dueDate, priority, project) => {
    dataBase.pushTask(taskTitle, description, dueDate, priority, project);
    idk();
    console.log(dataBase.taskData);
  }

  const idk = () => {
    dataBase.taskData.forEach(item => {
      domStuff.task(item.title, dataBase.taskData.indexOf(item), item.dueDate);
    })
  }

  // add function that loops through taskData and renders content on page, if content is to be rendered on a project, filter out objects in taskData that contain the corresponding project name. 

  // weekly/today function that filters out taskData based on due date

  // project function that loops through projectData and refreshes projects on page (when user deletes project)

  // when user deletes a project run a function that takes in project name as a parameter, loop through taskData and delete tasks with corresponding project name

  return { logic, idk }
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFVBQVU7QUFDVixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQSxHQUFHOztBQUVIOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxNQUFNO0FBQ2pELFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFVBQVU7QUFDVixDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ZhY3RvcnkgZnVuYyB0aGF0IG1ha2VzIHRvLWRvc1xuY29uc3QgdGFza0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkgPT4ge1xuICBjb25zdCB0YXNrID0ge1xuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLCBcbiAgICBkdWVEYXRlLCBcbiAgICBwcmlvcml0eSwgXG4gICAgcHJvamVjdFxuICB9XG5cbiAgcmV0dXJuIHRhc2s7XG59O1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuYW1lO1xufVxuXG5cblxuLy9ob2xkcyBhbGwgZGF0YVxuY29uc3QgZGF0YUJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gIGxldCB0YXNrRGF0YSA9IFtdO1xuICBsZXQgcHJvamVjdERhdGEgPSBbXTtcblxuICBjb25zdCBwdXNoVGFzayA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgIHRhc2tEYXRhLnB1c2godGFzayk7XG4gIH1cblxuICBjb25zdCBwdXNoUHJvamVjdCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KG5hbWUpO1xuICAgIHByb2plY3REYXRhLnB1c2gocHJvamVjdCk7XG4gIH1cblxuICBjb25zdCBkZWxldGVUYXNrID0gKCkgPT4ge1xuXG4gIH1cblxuICByZXR1cm4geyBwdXNoVGFzaywgcHVzaFByb2plY3QsIHRhc2tEYXRhIH07XG59KSgpO1xuXG4vL3Jlc3BvbnNpYmxlIGZvciBtYW5pcHVsYXRpbmcgdGhlIGRvbVxuY29uc3QgZG9tU3R1ZmYgPSAoZnVuY3Rpb24oKSB7XG4gIC8vbWFpbiBwYWdlIHF1ZXJ5IHNlbGVjdG9yc1xuICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpO1xuICBjb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlcIik7XG4gIGNvbnN0IHdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtcIik7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0XCIpO1xuICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50LWNvbnRhaW5lclwiKTtcbiAgY29uc3QgbWFpblBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXBhbmVsXCIpO1xuXG4gIC8vYWRkIHRhc2sgcXVlcnkgc2VsZWN0b3JzXG4gIGNvbnN0IG5ld1Rhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrXCIpO1xuXG4gIG5ld1Rhc2tDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBuZXdUYXNrQ29udGFpbmVyKSBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkZWxldGUtdGFzaycpKSB7XG5cbiAgICB9XG5cbiAgfSk7XG5cbiAgY29uc3QgY2xvc2VOZXdUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZS1uZXctdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG5ld1Rhc2tDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICB9KTtcblxuICBjb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXRhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stdGl0bGVcIikudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2R1ZS1kYXRlXCIpLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0XCIpLnZhbHVlO1xuICAgIGFwcC5sb2dpYyh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgbmV3VGFza0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcblxuICB9KVxuXG5cbiAgLy9tYWluIHBhZ2UgZXZlbnQgbGlzdGVuZXJzXG4gIGhvbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXIoXCJIb21lXCIpO1xuICAgIGFwcC5pZGsoKTtcbiAgfSk7XG5cbiAgdG9kYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblxuICB9KTtcblxuICB3ZWVrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgfSk7XG5cbiAgbmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gIH0pO1xuXG4gIGNvbnRlbnRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoXCIjYWRkLXRhc2tcIikpIHtcbiAgICAgIHRyaWdnZXJNb2RhbENvbnRhaW5lcihuZXdUYXNrQ29udGFpbmVyKTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgY29uc3QgdHJpZ2dlck1vZGFsQ29udGFpbmVyID0gbW9kYWwgPT4ge1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICB9XG4gIFxuICBjb25zdCB0YXNrID0gKHRpdGxlLCBpbmRleCwgZHVlRGF0ZSkgPT4ge1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKVxuICAgICAgdGFzay5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2PlxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJcIiBpZD1cIiR7aW5kZXh9XCI+XG4gICAgICA8cD4ke3RpdGxlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPHA+JHtkdWVEYXRlfTwvcD5cbiAgICAgIDxzcGFuIGlkPVwiZGVsZXRlLXRhc2tcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICBgO1xuICAgICAgY29udGVudENvbnRhaW5lci5pbnNlcnRCZWZvcmUodGFzaywgY29udGVudENvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0U2libGluZyk7XG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAoaGVhZGluZykgPT4ge1xuICAgIC8vIG1haW5QYW5lbC5pbm5lckhUTUwgPSBgXG4gICAgLy8gICA8aDI+JHtoMn08L2gyPlxuICAgIC8vICAgPGRpdiBpZD1cImFkZC10YXNrXCIgY2xhc3M9XCJ0YXNrXCI+KyBBZGQgVGFzazwvZGl2PlxuICAgIC8vIGA7XG4gICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICBoMi5pbm5lclRleHQgPSBoZWFkaW5nO1xuICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYWRkVGFzay5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFkZC10YXNrXCIpO1xuICAgICAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgIGFkZFRhc2suaW5uZXJUZXh0ID0gXCIrIEFkZCBUYXNrXCI7XG4gICAgbWFpblBhbmVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpblBhbmVsLmFwcGVuZENoaWxkKGgyKTtcbiAgICBtYWluUGFuZWwuYXBwZW5kQ2hpbGQoYWRkVGFzayk7XG4gICAgLy8gaDIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkVGFzaywgaDIubmV4dFNpYmxpbmcpO1xuXG4gIH1cblxuICBjb25zdCBjbGVhckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgY29udGVudENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG4gIFxuICByZXR1cm4geyByZW5kZXIsIHRhc2sgfVxufSkoKTtcblxuLy9tYWdpYyBzdHVmZiBoYXBwZW5zIGhlcmVcbmNvbnN0IGFwcCA9IChmdW5jdGlvbigpIHtcbiAgY29uc3QgbG9naWMgPSAodGFza1RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpID0+IHtcbiAgICBkYXRhQmFzZS5wdXNoVGFzayh0YXNrVGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgaWRrKCk7XG4gICAgY29uc29sZS5sb2coZGF0YUJhc2UudGFza0RhdGEpO1xuICB9XG5cbiAgY29uc3QgaWRrID0gKCkgPT4ge1xuICAgIGRhdGFCYXNlLnRhc2tEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBkb21TdHVmZi50YXNrKGl0ZW0udGl0bGUsIGRhdGFCYXNlLnRhc2tEYXRhLmluZGV4T2YoaXRlbSksIGl0ZW0uZHVlRGF0ZSk7XG4gICAgfSlcbiAgfVxuXG4gIC8vIGFkZCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggdGFza0RhdGEgYW5kIHJlbmRlcnMgY29udGVudCBvbiBwYWdlLCBpZiBjb250ZW50IGlzIHRvIGJlIHJlbmRlcmVkIG9uIGEgcHJvamVjdCwgZmlsdGVyIG91dCBvYmplY3RzIGluIHRhc2tEYXRhIHRoYXQgY29udGFpbiB0aGUgY29ycmVzcG9uZGluZyBwcm9qZWN0IG5hbWUuIFxuXG4gIC8vIHdlZWtseS90b2RheSBmdW5jdGlvbiB0aGF0IGZpbHRlcnMgb3V0IHRhc2tEYXRhIGJhc2VkIG9uIGR1ZSBkYXRlXG5cbiAgLy8gcHJvamVjdCBmdW5jdGlvbiB0aGF0IGxvb3BzIHRocm91Z2ggcHJvamVjdERhdGEgYW5kIHJlZnJlc2hlcyBwcm9qZWN0cyBvbiBwYWdlICh3aGVuIHVzZXIgZGVsZXRlcyBwcm9qZWN0KVxuXG4gIC8vIHdoZW4gdXNlciBkZWxldGVzIGEgcHJvamVjdCBydW4gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGluIHByb2plY3QgbmFtZSBhcyBhIHBhcmFtZXRlciwgbG9vcCB0aHJvdWdoIHRhc2tEYXRhIGFuZCBkZWxldGUgdGFza3Mgd2l0aCBjb3JyZXNwb25kaW5nIHByb2plY3QgbmFtZVxuXG4gIHJldHVybiB7IGxvZ2ljLCBpZGsgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=