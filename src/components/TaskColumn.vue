<!-- components/TaskColumn.vue -->
<template>
  <a-card :title="column.title">
    <a-list
      itemLayout="vertical"
      size="large"
      :data-source="column.tasks"
      :loading="loading"
      style="background: #fff; padding: 20px"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              <RouterLink class="link" :to="`/tasks/${item.id}`">{{
                item.title
              }}</RouterLink>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template></a-list
    >
  </a-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { List } from "ant-design-vue";

// const { data: loading } = List.useList();
const loading = ref(true);
const column = ref({
  title: "Новая колонка",
  tasks: [],
});
onMounted(() => {
  // Здесь можно добавить логику загрузки задач из API
  setTimeout(() => {
    column.value.tasks = [
      { id: "1", title: "Задача 1", description: "Описание задачи 1" },
      { id: "2", title: "Задача 2", description: "Описание задачи 2" },
      { id: "3", title: "Задача 3", description: "Описание задачи 3" },
    ];
    loading.value = false;
  }, 1000);
});
</script>
