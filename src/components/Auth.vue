<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/usersStore";

const usersStore = useUserStore();
const name = ref("");
const email = ref("");

const submitForm = () => {
  usersStore.createUser({
    name: name.value,
    email: email.value,
  });
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <a-input v-model:value="name" placeholder="User Name" />
    <a-input v-model:value="email" placeholder="User Email" />

    <button type="submit">Create</button>
  </form>
</template>

<style scoped></style>
