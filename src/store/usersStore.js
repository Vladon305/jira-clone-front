import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async createUser(userData) {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      this.user = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));

      window.location.replace("http://localhost:5173/projects");
    },
    async fetchUsers() {
      const response = await axios.get("http://localhost:3000/users");
      this.users = response.data;
    },
    async logout() {
      localStorage.removeItem("user");
      window.location.reload();
      this.user = {};
    },
  },
});
