window.onload = function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        createTaskElement(task.id, task.text)
    })
}

function addTask() {
    const taskInput = document.getElementById('inputTask')
    const taskText = taskInput.value.trim()
    if (!taskText) return

    const taskId = Date.now().toString() // unique ID based on timestamp
    createTaskElement(taskId, taskText)

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push({ id: taskId, text: taskText })
    localStorage.setItem('tasks', JSON.stringify(tasks))

    taskInput.value = ""
}

function createTaskElement(taskId, taskText) {
    const taskList = document.getElementById('taskList')

    const newTask = document.createElement('li')
    newTask.classList.add('task-item')
    newTask.setAttribute('data-id', taskId)

    const span = document.createElement('span')
    span.textContent = taskText
    newTask.appendChild(span)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add('delete-btn')
    deleteBtn.onclick = function () {
        newTask.remove()
        removeFromStorage(taskId)
    }

    newTask.appendChild(deleteBtn)
    taskList.appendChild(newTask)
}

function removeFromStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.filter(task => task.id !== taskId)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
