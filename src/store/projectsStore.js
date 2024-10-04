import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "./usersStore";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [],
    currentProject: {},
  }),
  getters: {
    getCurrentProject: (state) => state.currentProject,
    getCurrentProjectTasks: (state) => state.currentProject?.tasks,
    getCurrentProjectTasksCount: (state) => state.currentProject?.tasks?.length,
    getProjects: (state) => state.projects,
    getProjectsCount: (state) => state.projects.length,
  },
  actions: {
    async fetchProjects() {
      const usersStore = useUserStore();
      const response = await axios.get("http://localhost:3000/projects", {
        params: {
          userId: usersStore.user.id,
        },
      });
      this.projects = response.data;
    },
    async fetchProject(id) {
      const response = await axios.get(`http://localhost:3000/projects/${id}`);
      this.currentProject = response.data;
    },
    async createProject(projectData, userId) {
      const response = await axios.post(
        `http://localhost:3000/projects`,
        projectData,
        { params: { userId } }
      );
      this.projects.push(response.data);
      return response.data;
    },
    async updateProject(id, project) {
      const response = await axios.patch(
        `http://localhost:3000/projects/${id}`,
        project
      );
      window.location.reload();
      return response.data;
    },
    async deleteProject(id) {
      const response = await axios.delete(
        `http://localhost:3000/projects/${id}`
      );

      window.location.replace("http://localhost:5173/projects");
      return response.data;
    },
  },
});
