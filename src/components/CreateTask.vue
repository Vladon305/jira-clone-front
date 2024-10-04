<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Task name" />
      <textarea v-model="description" placeholder="Task Description"></textarea>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "../store/tasksStore";
import { useProjectsStore } from "../store/projectsStore";
import { useRouter } from "vue-router";

const router = useRouter();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();
const name = ref("");
const description = ref("");

const submitForm = () => {
  tasksStore.createTask(
    {
      name: name.value,
      description: description.value,
    },
    projectsStore.getCurrentProject?.id
  );
  router.push(`/projects/${projectsStore.getCurrentProject?.id}`);
};
</script>
