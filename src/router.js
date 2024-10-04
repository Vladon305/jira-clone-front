import { createWebHistory, createRouter } from "vue-router";

import Auth from "./components/Auth.vue";
import Projects from "./components/Projects.vue";
import CreateProject from "./components/CreateProject.vue";
import ProjectInfo from "./components/ProjectInfo.vue";
import CreateTask from "./components/CreateTask.vue";
import TaskInfo from "./components/TaskInfo.vue";
import Board from "./components/Board.vue";

const routes = [
  // {
  //   path: "/",
  //   component: Auth,
  // },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/projects/:id",
    component: ProjectInfo,
  },
  {
    path: "/projects/create",
    component: CreateProject,
  },
  {
    path: "/tasks/create",
    component: CreateTask,
  },
  {
    path: "/tasks/:id",
    component: TaskInfo,
  },
  {
    path: "/board/:id",
    component: Board,
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
