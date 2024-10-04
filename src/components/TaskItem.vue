<template>
  <a-card hoverable style="width: 100%">
    <template v-if="hasActions" #actions>
      <EditOutlined key="edit" @click="showModalEdit" />
      <DeleteOutlined key="delete" @click="onDelete" />
    </template>

    <RouterLink v-if="hasLink" class="link" :to="`/tasks/${item.id}`">
      <a-card-meta
        :title="props.item.name"
        :description="props.item.description"
      />
    </RouterLink>
    <a-card-meta
      v-else
      :title="props.item.name"
      :description="props.item.description"
    />

    <a-tag v-if="item.status" color="processing">{{ item.status }}</a-tag>
  </a-card>
  <EditTaskForm
    :open="open"
    @onOk="onEdit"
    @onCancel="open = false"
    :defaultValues="item"
  />
</template>

<script setup>
import { defineProps, ref } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { useTasksStore } from "../store/tasksStore";
import EditTaskForm from "./EditTaskForm.vue";
const props = defineProps({
  item: {
    name: String,
    description: String,
    status: String,
    id: Number,
  },
  hasLink: { type: Boolean, default: true },
  hasActions: { type: Boolean, default: true },
  //   onEdit: Function,
});
const tasksStore = useTasksStore();
const open = ref(false);

const onEdit = (task) => {
  tasksStore.updateTask(props.item.id, { ...props.item, ...task });
  open.value = false;
};

const onDelete = () => {
  tasksStore.deleteTask(props.item.id);
};

const showModalEdit = () => {
  open.value = true;
};
</script>

<style></style>
