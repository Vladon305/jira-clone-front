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
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, reactive, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  open: Boolean,
  defaultValues: Object,
});

const formState = reactive({
  name: "",
  description: "",
});

const emit = defineEmits(["onOk", "onCancel"]);

const handleOk = () => {
  emit("onOk", formState);
};
onMounted(() => {
  if (props.defaultValues) {
    formState.name = props.defaultValues.name || "";
    formState.description = props.defaultValues.description || "";
  }
});

watch(
  () => props.defaultValues,
  (newValues) => {
    if (newValues) {
      formState.name = newValues.name || "";
      formState.description = newValues.description || "";
    }
  },
  { immediate: true }
);
</script>

<style></style>
