class Alert {
  static AlertMesage(message) {
    alert(message);
  }

  static ConfirmDelete() {
    return confirm("Are you sure you want to delete?");
  }
}

class ProjectManager {
  constructor() {
    if (!ProjectManager.instance) {
      this.allProjects = this.loadProjectFromStorage();
      ProjectManager.instance = this;
    }
    return ProjectManager.instance;
  }

  loadProjectFromStorage() {
    try {
      const storedData = localStorage.getItem("allProjects");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to parse stored projects", error);
      return [];
    }
  }

  deleteAllProjects() {
    if (Alert.ConfirmDelete()) {
      this.allProjects = [];
      this.saveProjectsToStorage();
      Alert.AlertMesage("Deleted sucessfully");
    }
  }

  createNewProject(name, id) {
    const newProject = {
      name,
      projectId: id ? id : crypto.randomUUID(),
      projectTodos: [],
      dateCreated: new Date().toDateString(),
    };
    this.allProjects.push(newProject);
    this.saveProjectsToStorage();
    Alert.AlertMesage(`Project "${name}" created successfully.`);
  }

  deleteProject(projectId) {
    if (Alert.ConfirmDelete()) {
      const project = this.findProjectById(projectId);
      this.allProjects = this.allProjects.filter(
        (project) => project.projectId !== projectId
      );
      Alert.AlertMesage(`Project "${project.name}" deleted successfully.`);
      this.saveProjectsToStorage();
    }
  }

  createNewTodo(title, description, dueDate, finished, priority, notes) {
    return {
      title,
      description,
      dueDate,
      finished,
      priority,
      notes,
      todoId: crypto.randomUUID(),
      dateCreated: new Date().toDateString(),
    };
  }

  addTodoToProject(
    title,
    description,
    dueDate,
    finished,
    priority,
    notes,
    projectId
  ) {
    const project = this.findProjectById(projectId);
    if (!project) {
      return Alert.AlertMesage(`Project not found.`);
    }

    const newTodo = this.createNewTodo(
      title,
      description,
      dueDate,
      finished,
      priority,
      notes
    );
    project.projectTodos.push(newTodo);
    this.saveProjectsToStorage();
    Alert.AlertMesage(`Todo added to "${project.name}" successfully.`);
  }

  deleteTodoFromProject(projectId, todoId) {
    if (Alert.ConfirmDelete()) {
      const project = this.findProjectById(projectId);

      if (project) {
        project.projectTodos = project.projectTodos.filter(
          (todo) => todo.todoId !== todoId
        );
        this.saveProjectsToStorage();
        Alert.AlertMesage(`Todo deleted from "${project.name}" successfully!`);
      } else {
        Alert.AlertMesage("Project not found");
      }
    }
  }

  findProjectById(projectId) {
    return this.allProjects.find((project) => project.projectId === projectId);
  }

  getAllProjects() {
    return this.allProjects;
  }

  saveProjectsToStorage() {
    localStorage.setItem("allProjects", JSON.stringify(this.allProjects));
  }
}

export { ProjectManager };
