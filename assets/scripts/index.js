import {
    taskInput,
    addTaskButton,
    taskList,
    showAllTasksButton,
    showCompletedTasksButton,
    showIncompletedTasksButton }
  from './declaration.js';

  document.addEventListener('DOMContentLoaded', () => {
    // Загрузка данных из localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
      addTaskToList(task);
    });


    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTaskToList({text: taskText, completed: false});
        taskInput.value = ''; // Clear the input field
        // Update tasks in localStorage
        savedTasks.push({text: taskText, completed: false});
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
      }
    });

        //слушатели для кнопок фильтрации
      showAllTasksButton.addEventListener('click', () => {
        showAllTasks();
        showAllTasksButton.classList.add('disabled');
        showCompletedTasksButton.classList.remove('disabled');
        showIncompletedTasksButton.classList.remove('disabled');
      });

      showCompletedTasksButton.addEventListener('click', () => {
        showCompletedTasks();
        showCompletedTasksButton.classList.add('disabled')
        showAllTasksButton.classList.remove('disabled');
        showIncompletedTasksButton.classList.remove('disabled');
      });

      showIncompletedTasksButton.addEventListener('click', () => {
        showIncompletedTasks();
        showIncompletedTasksButton.classList.add('disabled');
        showCompletedTasksButton.classList.remove('disabled');
        showAllTasksButton.classList.remove('disabled')
      })

      function showAllTasks() {
        //функция вывода всех задач
        Array.from(taskList.children).forEach(li => {
          li.style.display = 'flex';
        });
      }

      function showCompletedTasks() {
        // функция вывода только завершенных задач
        Array.from(taskList.children).forEach(li => {
          const checkbox = li.querySelector('.checkbox__value');
          li.style.display = checkbox && checkbox.checked ? 'flex' : 'none';
        });
      }

      function showIncompletedTasks() {
        // функция вывода незавершенных задач
        Array.from(taskList.children).forEach(li => {
          const checkbox = li.querySelector('.checkbox__value');
            li.style.display = !checkbox.checked ? 'flex' : 'none';
        });
      }

      //функция добавления задач
    function addTaskToList(taskObj) {
      const li = document.createElement('li');

      const taskLabel = document.createElement('label');
      taskLabel.classList.add('text__wrapper')

      const checkBox = document.createElement('input');
      checkBox.classList.add('checkbox__value')
      checkBox.type = 'checkbox';

      taskLabel.textContent = taskObj.text;
      checkBox.checked = taskObj.completed;

      taskLabel.style.textDecoration = taskObj.completed ? 'line-through' : 'none';

      li.append(checkBox, taskLabel);
      li.classList.add('list__item');

      checkBox.addEventListener('change', () => {
        taskObj.completed = checkBox.checked;
        taskLabel.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
        taskLabel.style.color = checkBox.checked ? 'gray' : 'inherit'
        // Update tasks in localStorage
        const taskIndex = savedTasks.findIndex(t => t.text === taskObj.text);
        if (taskIndex > -1) {
          savedTasks[taskIndex] = taskObj;
          localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
      });

      // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete__button')
        deleteButton.textContent = 'Удалить';

        deleteButton.addEventListener('click', () => {
          taskList.removeChild(li);

        // Remove task from localStorage
        const taskIndex = savedTasks.indexOf(taskObj);
        if (taskIndex > -1) {
          savedTasks.splice(taskIndex,  1);
          localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
      });

      li.append(deleteButton); // Append delete button to the task list item
      taskList.appendChild(li);
     }

      //darkMode

      const darkModeButton = document.querySelector('.dark__mode');
      console.log(darkModeButton)
      const bodyElement = document.body;
      function toggleDarkMode() {
        bodyElement.classList.toggle('dark-mode');
        localStorage.setItem('darkModeEnabled', bodyElement.classList.contains('dark-mode'));
      }
      darkModeButton.addEventListener('click', () => {
        toggleDarkMode();
      });
      const darkModeEnabled = localStorage.getItem('darkModeEnabled');
      if (darkModeEnabled === 'true') {
        bodyElement.classList.add('dark-mode');
      }
  });