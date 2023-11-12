let inputs = document.getElementById("inp");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("doneDialog").addEventListener("click", () => {
  let selectedPriority = document.getElementById("dropdown").value;
  let taskText = inputs.value.trim();

  if (!taskText) {
    alert("Please enter a task");
    return;
  }

  let existingTask = document.querySelector(".selected-task");
  if (existingTask) {
    // Update existing task and save to local storage
    updatePriority(existingTask, selectedPriority);
    saveTasksToLocalStorage();
  } else {
    // Add new task and save to local storage
    addTaskToList(taskText, selectedPriority);
    saveTasksToLocalStorage();
  }

  inputs.value = "";
  document.getElementById("dialog").style.display = "none";
});

function addTaskToList(taskText, selectedPriority) {
  let taskList;
  switch (selectedPriority) {
    case "highpriopt":
      taskList = document.querySelector(".hptasks");
      break;
    case "midpriopt":
      taskList = document.querySelector(".mptasks");
      break;
    case "lowpriopt":
      taskList = document.querySelector(".lptasks");
      break;
    case "donepriopt":
      taskList = document.querySelector(".done");
      break;
    default:
      return;
  }

  let newTask = document.createElement("li");
  newTask.innerHTML = `${taskText} <i class="fa-solid fa-trash"></i> <i class="fa-solid fa-caret-down"></i>`;
  taskList.appendChild(newTask);

  newTask.querySelector(".fa-trash").addEventListener("click", removeTask);
  newTask.querySelector(".fa-caret-down").addEventListener("click", openDialog);
}

function updatePriority(taskElement, selectedPriority) {
  let taskList;
  switch (selectedPriority) {
    case "highpriopt":
      taskList = document.querySelector(".hptasks");
      break;
    case "midpriopt":
      taskList = document.querySelector(".mptasks");
      break;
    case "lowpriopt":
      taskList = document.querySelector(".lptasks");
      break;
    case "donepriopt":
      taskList = document.querySelector(".done");
      break;
    default:
      return;
  }

  taskElement.remove();
  taskList.appendChild(taskElement);
}

function removeTask() {
  this.parentNode.remove();
  saveTasksToLocalStorage();
}

function openDialog() {
  let taskText = this.parentNode.textContent.trim().replace("🗑", "").replace("🔽", "");
  inputs.value = taskText;
  document.getElementById("dialog").style.display = "block";
  this.parentNode.classList.add("selected-task");
}

function saveTasksToLocalStorage() {
  let tasks = [];

  // Iterate through each list item and store task text and priority
  document.querySelectorAll(".taskslist ul li").forEach((taskElement) => {
    let taskText = taskElement.textContent.trim().replace("🗑", "").replace("🔽", "");
    let priority;

    if (taskElement.parentNode.classList.contains("hptasks")) {
      priority = "highpriopt";
    } else if (taskElement.parentNode.classList.contains("mptasks")) {
      priority = "midpriopt";
    } else if (taskElement.parentNode.classList.contains("lptasks")) {
      priority = "lowpriopt";
    } else if (taskElement.parentNode.classList.contains("done")) {
      priority = "donepriopt";
    }

    tasks.push({ text: taskText, priority: priority });
  });

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    addTaskToList(task.text, task.priority);
  });
}
