let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText !== '') {
        tasks.push({ text: taskText, dueDate: dueDate, done: false });
        renderTasks();
        taskInput.value = '';
        dueDateInput.value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        const taskDetails = document.createElement('div');
        taskDetails.textContent = `${task.text} - Due: ${task.dueDate}`;

        if (task.done) {
            taskItem.style.textDecoration = 'line-through';
        }
        taskItem.appendChild(taskDetails);
        taskItem.addEventListener('click', () => toggleTaskDone(index));

        // Append delete button to task item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent task toggle when clicking delete
            deleteTask(index);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
        
}

function toggleTaskDone(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(status) {
    const filteredTasks = tasks.filter(task => {
        if (status === 'all') {
            return true;
        } else if (status === 'completed') {
            return task.done;
        } else if (status === 'active') {
            return !task.done;
        }
    });
    tasks = filteredTasks;
    renderTasks();
}
function filterByDate() {
    const filterDateInput = document.getElementById('filterDate');
    const filterDate = filterDateInput.value;

    const filteredTasks = tasks.filter(task => task.dueDate === filterDate);
    tasks = filteredTasks;
    renderTasks();
}

document.getElementById('filterAll').addEventListener('click', () => filterTasks('all'));
document.getElementById('filterCompleted').addEventListener('click', () => filterTasks('completed'));
document.getElementById('filterActive').addEventListener('click', () => filterTasks('active'));
