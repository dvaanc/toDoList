# to-do-list
 Part of the Odin Project curriculum.

## Project Overview
A project drawing inspiration from existing task web apps online, the user is able to create, edit, and delete 'todos' that act as reminders for the user. The to-dos contain multiple properties such as: title, description, priority, due date, and what task group it belongs to.

Module design pattern, seperating related functions into groups (the DOM, app logic, and database), and localStorage was used in this project.
### Live Preview: **https://dvaanc.github.io/toDoList/**
#### Features to be added:
- Delete Project (Will have to clear local storage via console for now)
- Variable that records what page is being displayed and render tasks based on variable value
- Refactor code, parts of DOM module are handling more than one responsibility (Calling other functions)