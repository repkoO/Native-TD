import {
    showAllTasksButton,
    showCompletedTasksButton,
    showIncompletedTasksButton,
    taskList,
    savedTasks
} from "./declaration.js";

//функция вывода всех задач
export function showAllTasks() {
  Array.from(taskList.children).forEach(li => {
    li.style.display = 'flex';
  });
  showAllTasksButton.classList.add('disabled');
  showCompletedTasksButton.classList.remove('disabled');
  showIncompletedTasksButton.classList.remove('disabled');
}

// функция вывода только завершенных задач
export function showCompletedTasks() {
  Array.from(taskList.children).forEach(li => {
    const checkbox = li.querySelector('.checkbox__value');
    li.style.display = checkbox && checkbox.checked ? 'flex' : 'none';
  });
  showCompletedTasksButton.classList.add('disabled')
  showAllTasksButton.classList.remove('disabled');
  showIncompletedTasksButton.classList.remove('disabled');
}

// функция вывода незавершенных задач
export function showIncompletedTasks() {
  Array.from(taskList.children).forEach(li => {
    const checkbox = li.querySelector('.checkbox__value');
    li.style.display = !checkbox.checked ? 'flex' : 'none';
  });
  showIncompletedTasksButton.classList.add('disabled');
  showCompletedTasksButton.classList.remove('disabled');
  showAllTasksButton.classList.remove('disabled')
}


//функция добавления задач
export function addTaskToList(taskObj) {
  const li = document.createElement('li');
  li.classList.add('list__item');

  const taskLabel = document.createElement('label');
  taskLabel.classList.add('text__wrapper')

  const checkBox = document.createElement('input');
  checkBox.classList.add('checkbox__value')
  checkBox.type = 'checkbox';

  taskLabel.textContent = taskObj.text;
  checkBox.checked = taskObj.completed;

  taskLabel.style.textDecoration = taskObj.completed ? 'line-through' : 'none';

  //отметка через чекБокс
  checkBox.addEventListener('change', checkBoxHandler);

  function checkBoxHandler() {
    taskObj.completed = checkBox.checked;
    taskLabel.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
    taskLabel.style.color = checkBox.checked ? 'gray' : 'inherit'
    const taskIndex = savedTasks.findIndex(t => t.text === taskObj.text);
    if (taskIndex > -1) {
      savedTasks[taskIndex] = taskObj;
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  }

    // Кнопка удаления
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete__button')
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(li);
    const taskIndex = savedTasks.indexOf(taskObj);
    if (taskIndex > -1) {
      savedTasks.splice(taskIndex,  1);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  });

  li.append(checkBox, taskLabel, deleteButton);
  taskList.append(li);
}