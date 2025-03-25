import "./style.css";
import { Project, ProjectManager, ToDo } from "./todo";

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
  const allProjectsData = JSON.parse(localStorage.getItem("allProjects")) || [];
  if (allProjectsData.length > 0) {
    projectsContent.innerHTML = allProjectsData
      .map(
        (project) => `
        <div class="projectDiv">
          <h3>${project.name}</h3>
          <p>Project ID: ${project.projectId || "N/A"}</p>
          <ul class='todoDetails'>
          ${project.projectTodos.map(
            (todo) => `
            <li>${todo.title}</li>
            <li>${todo.description}</li>
            <li>${todo.notes}</li>
            <li>${todo.priority}</li>
            <li>${
              todo.finished.toLowerCase() === "on" ? "Finished" : "Not Finished"
            }</li>
            `
          )}
          </ul>
        </div>
      `
      )
      .join("");
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

const projectManager = new ProjectManager();
const schoolProject = projectManager.addProject("Third project");
schoolProject.addTodo(
  "finish assignment",
  "research and finish mathematics assignment.",
  "february 12, 2026",
  true,
  "urgent",
  "no notes"
);
schoolProject.addTodo(
  "finish biology",
  "research and finish mathematics assignment.",
  "february 12, 2026",
  true,
  "urgent",
  "no notes"
);
console.log(schoolProject.projectTodos);
console.log(projectManager.getAllProjects());
