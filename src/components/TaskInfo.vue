<template>
  <a-card :title="`Task: ${task.name}`" :bordered="false" style="width: 100%">
    <template #extra>
      <a-button type="primary" @click="showModal">edit task</a-button>
    </template>
    <div>{{ task.description }}</div>
  </a-card>
  <!-- <a-modal v-model:open="open" title="Edit task" @ok="handleOk"> -->
  <EditTaskForm
    :open="open"
    @onOk="handleOk"
    @onCancel="open = false"
    :defaultValues="task"
  />
  <!-- </a-modal> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTasksStore } from "../store/tasksStore";
import EditTaskForm from "./EditTaskForm.vue";

const router = useRouter();
const tasksStore = useTasksStore();
const { getCurrentTask: task } = storeToRefs(tasksStore);
const taskId = router.currentRoute.value.params?.id;

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (newTask) => {
  console.log(newTask);
  tasksStore.updateTask(taskId, { ...task, ...newTask });
  open.value = false;
};

onMounted(() => tasksStore.fetchTask(taskId));
</script>

<style scoped>
.link {
  display: block;
}
</style>
