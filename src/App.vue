<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, RouterView } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "./store/usersStore";

const router = useRouter();
const usersStore = useUserStore();
const selectedKeys = ref([]);

const logout = () => {
  usersStore.logout();
};

watch(
  () => usersStore.user,
  () => {
    if (!usersStore.user) {
      router.push("/auth");
    }
  }
);
onMounted(() => {
  if (!JSON.parse(localStorage.getItem("user"))) {
    router.push("/auth");
  }
});
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <RouterLink class="link" to="/projects/create"
            >create project</RouterLink
          ></a-menu-item
        >
        <a-menu-item key="2">
          <RouterLink class="link" to="/projects"
            >See projects</RouterLink
          ></a-menu-item
        >
        <a-menu-item key="3">
          <LogoutOutlined color="fff" @click="logout"
        /></a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
  <a-layout-content style="padding: 0 50px">
    <main><router-view /></main>
  </a-layout-content>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
.link {
  margin-inline: 10px;
}
</style>
