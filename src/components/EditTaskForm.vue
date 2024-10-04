<template>
  <a-modal
    v-model:open="props.open"
    title="Edit task"
    @ok="handleOk"
    @cancel="() => emit('onCancel')"
    ><a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="name"
        name="name"
        :rules="[{ required: true, message: 'Please input name!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="description" name="description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="assign to" name="assignedToId">
        <a-select
          v-model:value="formState.assignedToId"
          placeholder="Select user"
        >
          <a-select-option v-for="user in users" :value="user.id">{{
            user.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="status" name="status">
        <a-select v-model:value="formState.status" placeholder="Select status">
          <a-select-option value="PENDING">PENDING</a-select-option>
          <a-select-option value="IN_PROGRESS">IN_PROGRESS</a-select-option>
          <a-select-option value="COMPLETED">COMPLETED</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, reactive, defineProps, defineEmits, watch } from "vue";
import { useUserStore } from "../store/usersStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  open: Boolean,
  defaultValues: Object,
});

const usersStore = useUserStore();
const { getUsers: users } = storeToRefs(usersStore);

const formState = reactive({
  name: "",
  description: "",
  assignedToId: {},
  status: {},
});

const emit = defineEmits(["onOk", "onCancel"]);

const handleOk = () => {
  emit("onOk", formState);
};
onMounted(() => {
  if (props.defaultValues) {
    formState.name = props.defaultValues.name || "";
    formState.description = props.defaultValues.description || "";
    formState.assignedToId = props.defaultValues.assignedToId || "";
    formState.status = props.defaultValues.status || "PENDING";
  }

  usersStore.fetchUsers();
});

watch(
  () => props.defaultValues,
  (newValues) => {
    if (newValues) {
      formState.name = newValues.name || "";
      formState.description = newValues.description || "";
      formState.assignedToId = newValues.assignTo || "";
      formState.status = newValues.status || "PENDING";
    }
  },
  { immediate: true }
);
</script>

<style></style>
