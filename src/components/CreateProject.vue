<template>
  <div>
    <h1>Create Project</h1>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="Project Name" />
      <textarea
        v-model="description"
        placeholder="Project Description"
      ></textarea>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProjectsStore } from "../store/projectsStore";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/usersStore";

const router = useRouter();
const projectsStore = useProjectsStore();
const userStore = useUserStore();
const name = ref("");
const description = ref("");

const submitForm = async () => {
  const project = await projectsStore.createProject(
    {
      name: name.value,
      description: description.value,
    },
    userStore.user.id
  );

  if (project) {
    router.push(`${project.id}`);
  }
};
</script>
