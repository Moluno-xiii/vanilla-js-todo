import "./style.css";
import { ProjectManager } from "./todo";

const projectManager = new ProjectManager();

const closeModalBtn = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".modal-overlay");

function openForm(formDiv, projectId = null) {
  modalOverlay.classList.add("active");
  formDiv.classList.add("display");

  if (formDiv === todoForm && projectId) {
    document.getElementById("todoProjectId").value = projectId;
  }
}

function closeForm(formDiv) {
  modalOverlay.classList.remove("active");
  formDiv.classList.remove("display");
}

closeModalBtn.addEventListener("click", () => {
  closeForm(projectForm);
  closeForm(todoForm);
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

const projectsContent = document.getElementById("projectsDiv");
const todoForm = document.getElementById("addTodoForm");
const projectForm = document.getElementById("addProjectForm");
const createTodoButton = document.getElementById("createNewTodoButton");
const createProjectButton = document.getElementById("createNewProjectButton");
const deleteAllProjectsButton = document.getElementById(
  "deleteAllProjectsButton"
);

createTodoButton.addEventListener("click", function () {
  openForm(todoForm);
});
createProjectButton.addEventListener("click", function () {
  openForm(projectForm);
});
deleteAllProjectsButton.addEventListener("click", function () {
  projectManager.deleteAllProjects();
  loadProjects();
});

function loadProjects() {
  const allProjectsData = projectManager.getAllProjects();
  if (allProjectsData.length > 0) {
    projectsContent.innerHTML = allProjectsData
      .map(
        (project) => `
        <div class="projectDiv">
          <h3>${project.name}</h3>
          <p>Project ID: ${project.projectId || "N/A"}</p>
          <p>Date Created: ${project.dateCreated || "N/A"}</p>
          <ul class='todoDetails'>
          ${project.projectTodos
            .map(
              (todo) => `
              <h2>${todo.title}</h2>
              <p>Todo ID: ${todo.todoId || "N/A"}</p>
            <li>${todo.description}</li>
            <li>${todo.notes}</li>
            <li>${todo.priority}</li>
            <li>date created: ${todo.dateCreated}</li>
            <li>${
              todo.finished.toLowerCase() === "on" ? "Finished" : "Not Finished"
            }</li>
            <button data-project-id="${project.projectId}" data-todo-id="${
                todo.todoId
              }" class="deleteTodoButton">
                  Delete todo
            </button>`
            )
            .join("")}
          </ul>
          <div class="projectCta">
          <button class="addTodoButton" data-project-id="${
            project.projectId
          }">Add Todo</button>
          <button class="deleteProjectButton" data-project-id="${
            project.projectId
          }">Delete Project</button>
          </div>
        </div>
      `
      )
      .join("");
    document.querySelectorAll(".addTodoButton").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project-id");
        openForm(todoForm, projectId);
      });
    });

    document.querySelectorAll(".deleteTodoButton").forEach((button) => {
      button.addEventListener("click", function () {
        const todoId = this.getAttribute("data-todo-id");
        const projectId = this.getAttribute("data-project-id");
        projectManager.deleteTodoFromProject(projectId, todoId);
        loadProjects();
      });
    });

    document.querySelectorAll(".deleteProjectButton").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project-id");
        projectManager.deleteProject(projectId);
        loadProjects();
      });
    });
  } else {
    projectsContent.innerHTML =
      "<p>No projects available. Start by adding a project.</p>";
  }

  if (projectManager.getAllProjects().length > 1) {
    deleteAllProjectsButton.classList.remove("invincible");
  } else {
    deleteAllProjectsButton.classList.add("invincible");
  }
}

projectForm.addEventListener("submit", addProjectFormEvent);
todoForm.addEventListener("submit", submitTodo);

function submitTodo(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log("Project ID :", data.projectId);
  loadProjects();
  closeForm(todoForm);
  todoForm.reset();
  console.log(data);
  projectManager.addTodoToProject(
    data.title,
    data.description,
    data.dueDate,
    data.finished ? data.finished : "no",
    data.priority,
    data.notes,
    data.projectId
  );
  loadProjects();
}

function addProjectFormEvent(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  closeForm(projectForm);
  projectForm.reset();
  console.log(data);
  projectManager.createNewProject(data.name);
  loadProjects();
}
console.log(projectManager.getAllProjects());
loadProjects();

// divContent.innerText = "Todo Application";

// ctrl alt x on browser opens the ai tab.
// when we add a project, or delete a project, reload the projects data.
// add a confirmation alert when performing delete operations.
