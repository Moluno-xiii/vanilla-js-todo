class Alert {
  static AlertMesage(message) {
    alert(message);
  }
}

class ProjectManager {
  constructor() {
    if (!ProjectManager.instance) {
      this.allProjects = [];
    }
    return ProjectManager.instance;
  }

  addProject(name) {
    const newProject = new Project(name);
    this.allProjects.push(newProject);
    console.log("new project created", newProject);
    localStorage.setItem("allProjects", JSON.stringify(this.allProjects));

    Alert.AlertMesage("Project Added successfully");
    return newProject;
  }

  getProjectById(id) {
    return this.allProjects.find((project) => project.projectId === id);
  }

  getAllProjects() {
    return JSON.parse(localStorage.getItem("allProjects") || []);
  }

  deleteProject(id) {
    this.allProjects = this.allProjects.filter(
      (project) => project.projectId !== id
    );
    localStorage.setItem("allProjects", JSON.stringify(this.allProjects));
    console.log("project deleted successfully");
    Alert.AlertMesage("Project deleted successfully.");
  }
}

class ToDo {
  constructor(title, description, dueDate, finished, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.finished = finished;
    this.priority = priority;
    this.notes = notes;
    this.todoId = crypto.randomUUID();
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.projectId = crypto.randomUUID();
    this.projectTodos = [];
  }

  addTodo(title, description, dueDate, finished, priority, notes) {
    let newTodo = new ToDo(
      title,
      description,
      dueDate,
      finished,
      priority,
      notes
    );
    this.projectTodos.push(newTodo);
  }

  deleteTodoFromProject(todoId) {
    this.projectTodos = this.projectTodos.filter(
      (todo) => todo.todoId !== todoId
    );
    console.log("Todo deleted successfully");
    console.log(this.projectTodos);
    Alert.AlertMesage("Todo Deleted Successfully");
  }
}

// view all projects.
// delete a todo
// view all todos in each project.
// add color for different priorities.
// expand a single todo to see it's details.
// date.toDateString()
// sorting
// when user clicks on the create new todo, create a new project called other todos, and add the todo there.

export { ToDo, Project, ProjectManager };
