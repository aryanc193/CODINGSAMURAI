let inputs = document.getElementById("inp");

document.getElementById("doneDialog").addEventListener("click", () => {
  let selectedPriority = document.getElementById("dropdown").value;
  let taskText = inputs.value.trim();

  if (!taskText) {
    alert("Please enter a task");
    return;
  }

  // Check if there's an existing task to update priorities
  let existingTask = document.querySelector(".selected-task");
  if (existingTask) {
    updatePriority(existingTask, selectedPriority);
  } else {
    // If no existing task, create a new one
    addTaskToList(taskText, selectedPriority);
  }

  // Reset input value and close the dialog
  inputs.value = "";
  document.getElementById("dialog").style.display = "none";
});

function addTaskToList(taskText, selectedPriority) {
  let taskList;
  switch (selectedPriority) {
    case "option1":
      taskList = document.querySelector(".hptasks");
      break;
    case "option2":
      taskList = document.querySelector(".mptasks");
      break;
    case "option3":
      taskList = document.querySelector(".lptasks");
      break;
    case "option4":
      taskList = document.querySelector(".done");
      break;
    default:
      alert("Invalid priority");
      return;
  }

  let newTask = document.createElement("li");
  newTask.innerHTML = `${taskText} <i class="fa-solid fa-caret-down"></i> <i class="fa-solid fa-trash"></i>`;
  taskList.appendChild(newTask);

  newTask.querySelector(".fa-trash").addEventListener("click", removeTask);
  newTask.querySelector(".fa-caret-down").addEventListener("click", openDialog);
}

function updatePriority(taskElement, selectedPriority) {
  let taskList;
  switch (selectedPriority) {
    case "option1":
      taskList = document.querySelector(".hptasks");
      break;
    case "option2":
      taskList = document.querySelector(".mptasks");
      break;
    case "option3":
      taskList = document.querySelector(".lptasks");
      break;
    case "option4":
      taskList = document.querySelector(".done");
      break;
    default:
      alert("Invalid priority");
      return;
  }

  // Remove task from its current list
  taskElement.remove();

  // Add task to the new list
  taskList.appendChild(taskElement);
}

function removeTask() {
  this.parentNode.remove();
}

function openDialog() {
  let taskText = this.parentNode.textContent.trim().replace("🗑", "").replace("🔽", "");
  inputs.value = taskText;
  document.getElementById("dialog").style.display = "block";
  this.parentNode.classList.add("selected-task");
}
