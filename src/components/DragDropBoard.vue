<!-- components/DragDropBoard.vue -->
<template>
  <a-card title="Доска задач">
    <a-row
      :gutter="[16, 16]"
      type="flex"
      align="middle"
      class="row"
      style="justify-content: space-between"
    >
      <a-col class="col" :span="8">
        <draggable
          class="draggable-list"
          :list="pendingTasks"
          group="tasks"
          @change="(e) => onChangeDrag(e, 'PENDING')"
        >
          <TaskItem v-for="item in pendingTasks" :key="item.id" :item="item" />
        </draggable>
      </a-col>
      <a-col class="col" :span="8">
        <draggable
          class="draggable-list"
          :list="inProgressTasks"
          group="tasks"
          @change="(e) => onChangeDrag(e, 'IN_PROGRESS')"
        >
          <TaskItem
            v-for="item in inProgressTasks"
            :key="item.id"
            :item="item"
          />
        </draggable>
      </a-col>
      <a-col class="col" :span="8">
        <draggable
          class="draggable-list"
          :list="completedTasks"
          group="tasks"
          @change="(e) => onChangeDrag(e, 'COMPLETED')"
        >
          <TaskItem
            v-for="item in completedTasks"
            :key="item.id"
            :item="item"
          />
        </draggable>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { useRouter } from "vue-router";
import { useProjectsStore } from "../store/projectsStore";
import { storeToRefs } from "pinia";
import { useTasksStore } from "../store/tasksStore";
import TaskItem from "./TaskItem.vue";

const router = useRouter();
const projectsStore = useProjectsStore();
const tasksStore = useTasksStore();

const onChangeDrag = (event, newStatus) => {
  const { added } = event;
  if (added) {
    added.element.status = newStatus;
    tasksStore.changeTaskStatus(added.element.id, newStatus);
  }
};

const { getCurrentProjectTasks: tasksP } = storeToRefs(projectsStore);
const projectId = router.currentRoute.value.params?.id;

const tasks = ref({ pending: [], inProgress: [], completed: [] });
const pendingTasks = computed(() => tasks.value.pending);
const inProgressTasks = computed(() => tasks.value.inProgress);
const completedTasks = computed(() => tasks.value.completed);

watch(tasksP, (state) => {
  tasks.value = {
    pending: state.filter((task) => task.status === "PENDING"),
    inProgress: state.filter((task) => task.status === "IN_PROGRESS"),
    completed: state.filter((task) => task.status === "COMPLETED"),
  };
});

onMounted(() => projectsStore.fetchProject(projectId));
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}
.chosen {
  border: 2px solid blue;
}
.draggable-list {
  border: 1px solid black;
  height: 100%;
}
.col {
  height: 100%;
}
.row {
  height: 65vh;
  overflow: auto;
}
</style>
