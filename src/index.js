import "./style.css";
import { ProjectManager } from "./todo";

const projectManager = new ProjectManager();

function toggleVisibility(visibilityElement) {
  visibilityElement.classList.toggle("display");
}

const divContent = document.getElementById("content");
const projectsContent = document.getElementById("projectsDiv");
const todoForm = document.getElementById("addTodoForm");
const projectForm = document.getElementById("addProjectForm");
const createTodoButton = document.getElementById("createNewTodoButton");
const createProjectButton = document.getElementById("createNewProjectButton");

createTodoButton.addEventListener("click", () => toggleVisibility(todoForm));
createProjectButton.addEventListener("click", () =>
  toggleVisibility(projectForm)
);

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
            <button data-todo-id="${todo.todoId}" class="deleteTodoButton">
                  Delete todo
            </button>`
            )
            .join("")}
          </ul>
          <button class="addTodoButton" data-project-id="${
            project.projectId
          }">Add Todo</button>
        </div>
      `
      )
      .join("");
    document.querySelectorAll(".addTodoButton").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project-id");
        console.log("Project ID:", projectId);
        toggleVisibility(todoForm);
      });
    });

    document.querySelectorAll(".deleteTodoButton").forEach((button) => {
      button.addEventListener("click", function () {
        const todoId = this.getAttribute("data-todo-id");
        const projectId = this.getAttribute("data-project-id");
        projectManager.deleteTodoFromProject(
          1,
          "45f5bb13-b682-4a1c-bda4-d69e5f473f48"
        );
        loadProjects();
        console.log("todo ID:", todoId);
      });
    });
  } else {
    projectsContent.innerHTML = "<p>No projects available.</p>";
  }
}

projectForm.addEventListener("submit", formEvent);
todoForm.addEventListener("submit", formEvent);

function formEvent(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  loadProjects();
  console.log(data);
}

loadProjects();

// divContent.innerText = "Todo Application";
console.log(projectManager.getAllProjects());
// projectManager.createNewProject("New year's project", 2);
// projectManager.createNewProject("Another project i'll not finish", 1);
// projectManager.addTodoToProject(
//   "Create new year's resolution",
//   "Create a word document or spreadsheet and outline all new year resolutions and goals.",
//   "January 2nd 2025",
//   "no",
//   "high",
//   "no notes",
//   2
// );
// projectManager.addTodoToProject(
//   "Try and finish this one",
//   "nothign.",
//   "January 2nd 2025",
//   "no",
//   "medium",
//   "no notes",
//   1
// );

// ctrl alt x on browser opens the ai tab.
