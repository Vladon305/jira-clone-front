import { defineStore } from "pinia";
import axios from "axios";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    currentTask: {},
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getTasksCount: (state) => state.tasks.length,
    getCurrentTask: (state) => state.currentTask,
  },
  actions: {
    async createTask(projectData, projectId) {
      const response = await axios.post(
        `http://localhost:3000/tasks`,
        projectData,
        { params: { projectId } }
      );
      this.tasks.push(response.data);
      return response.data;
    },
    async fetchTask(id) {
      const response = await axios.get(`http://localhost:3000/tasks/${id}`);
      this.currentTask = response.data;
    },
    async updateTask(id, task) {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${id}`,
        task
      );
      window.location.reload();
      return response.data;
    },
    async assignTask(taskId, userId) {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${taskId}/assign/${userId}`
      );
      window.location.reload();
      return response.data;
    },
    async changeTaskStatus(id, status) {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${id}/status`,
        { status }
      );
      window.location.reload();
      return response.data;
    },
    async deleteTask(id) {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
      window.location.reload();
      return response.data;
    },
  },
});
