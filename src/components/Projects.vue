<template>
  <div>
    <h1>Projects</h1>
    <a-list
      v-if="getProjectsCount > 0"
      item-layout="horizontal"
      :data-source="projects"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              <RouterLink class="link" :to="`/projects/${item.id}`">{{
                item.name
              }}</RouterLink>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <div v-else>No data</div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useProjectsStore } from "../store/projectsStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();

const { getProjects: projects, getProjectsCount } = storeToRefs(projectsStore);

onMounted(() => {
  projectsStore.fetchProjects();
});
</script>

<style scoped>
.link {
  display: block;
}
</style>
