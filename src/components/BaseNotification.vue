<script setup lang="ts">
const props = defineProps({
  notificationType: {
    type: String,
    default: 'success',
    validator(value: string) {
      return ['success', 'warning', 'info', 'error'].includes(value);
    }
  },
  message: {
    type: String,
    required: true
  }
});
const classTypes: { [key: string]: string } = {
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
  error: 'is-danger'
};
</script>
<template>
  <div class="notification" :class="classTypes[props.notificationType]">{{ props.message }}</div>
</template>
<style scoped>
.notification {
  width: fit-content;
  margin: 0 auto;
}
</style>
