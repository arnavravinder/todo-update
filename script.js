document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskText = document.getElementById('newTask').value;
    if (taskText.trim() === '') return;

    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.classList.add('task-text');
    taskContent.textContent = taskText;

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(deleteButton);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskButtons);
    taskList.appendChild(taskItem);

    document.getElementById('newTask').value = '';
}
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('newTask').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});
document.getElementById('searchTask').addEventListener('input', searchTasks);

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = document.getElementById('newTask').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (taskText.trim() === '') return;

    const task = {
        text: taskText,
        category: taskCategory,
        priority: taskPriority,
        deadline: taskDeadline,
        completed: false
    };

    saveTask(task);
    renderTask(task);

    document.getElementById('newTask').value = '';
    document.getElementById('taskCategory').value = 'General';
    document.getElementById('taskPriority').value = 'Medium';
    document.getElementById('taskDeadline').value = '';
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');

    taskItem.classList.add('task-item');
    if (task.completed) taskItem.classList.add('completed');

    const taskContent = document.createElement('span');
    taskContent.classList.add('task-text');
    taskContent.textContent = `${task.text} - ${task.category} - ${task.priority} - ${task.deadline}`;

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        task.completed = !task.completed;
        updateTask(task);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        deleteTask(task);
    });

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(deleteButton);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskButtons);
    taskList.appendChild(taskItem);
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function updateTask(updatedTask) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.text === updatedTask.text && task.category === updatedTask.category);
    tasks[taskIndex] = updatedTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskToDelete.text || task.category !== taskToDelete.category);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTasks() {
    const searchTerm = document.getElementById('searchTask').value.toLowerCase();
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
        const taskText = task.querySelector('.task-text').textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}
