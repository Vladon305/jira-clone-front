<template>
  <a-card
    :title="`Project: ${project.name}`"
    :bordered="false"
    style="width: 100%"
  >
    <template #extra>
      <EditOutlined key="edit" @click="showModalEdit" />
      <DeleteOutlined key="delete" @click="onDelete" style="margin-left: 10px"
    /></template>
    <div>{{ project.description }}</div>
    <div>
      <RouterLink class="link" :to="`/board/${project.id}`"
        >Go to board</RouterLink
      >
    </div>
  </a-card>

  <a-card title="Tasks" :bordered="false" style="width: 100%">
    <template #extra
      ><RouterLink class="link" to="/tasks/create"
        >create task</RouterLink
      ></template
    >

    <a-card v-if="tasksCount > 0" :bordered="false" style="width: 100%">
      <a-list item-layout="horizontal" :data-source="tasks">
        <template #renderItem="{ item }">
          <TaskItem :item="item" />
        </template>
      </a-list>
    </a-card>

    <div v-else>No data</div>
  </a-card>
  <EditProjectForm
    :open="open"
    @onOk="onEdit"
    @onCancel="open = false"
    :defaultValues="project"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProjectsStore } from "../store/projectsStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import TaskItem from "./TaskItem.vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import EditProjectForm from "./EditProjectForm.vue";

const router = useRouter();
const projectsStore = useProjectsStore();
const {
  getCurrentProject: project,
  getCurrentProjectTasks: tasks,
  getCurrentProjectTasksCount: tasksCount,
} = storeToRefs(projectsStore);
const projectId = router.currentRoute.value.params?.id;
const open = ref(false);

const showModalEdit = () => {
  open.value = true;
};

const onEdit = (newProject) => {
  projectsStore.updateProject(projectId, newProject);
  open.value = false;
};

const onDelete = () => {
  projectsStore.deleteProject(projectId);
};

onMounted(() => projectsStore.fetchProject(projectId));
</script>

<style scoped>
.link {
  display: block;
}
</style>
