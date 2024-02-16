import {
  taskInput,
  addTaskButton,
  showAllTasksButton,
  showCompletedTasksButton,
  showIncompletedTasksButton,
  savedTasks
} from './declaration.js';

import {
  showAllTasks,
  showCompletedTasks,
  showIncompletedTasks,
  addTaskToList
} from './utils.js';

  document.addEventListener('DOMContentLoaded', () => {
    // Загрузка данных из localStorage
    savedTasks.forEach(task => {
      addTaskToList(task);
  });

  addTaskButton.addEventListener('click', addNewTask);
  //слушатели для кнопок фильтрации
  showAllTasksButton.addEventListener('click', showAllTasks);
  showCompletedTasksButton.addEventListener('click', showCompletedTasks);
  showIncompletedTasksButton.addEventListener('click', showIncompletedTasks);

  function addNewTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTaskToList({text: taskText, completed: false});
      taskInput.value = '';
      savedTasks.push({text: taskText, completed: false});
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  }
});