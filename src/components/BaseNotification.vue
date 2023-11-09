<script setup lang="ts">
const props = defineProps({
  notificationType: {
    type: String,
    default: 'success',
    validator(value: string) {
      return ['success', 'warning', 'info', 'error'].includes(value);
    }
  }
});
const classTypes: { [key: string]: string } = {
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
  error: 'is-danger'
};
const emit = defineEmits(['close']);
</script>
<template>
  <section class="notification has-text-centered" :class="classTypes[props.notificationType]">
    <header>
      <slot name="header"></slot>
    </header>
    <div>
      <!-- main content -->
      <slot></slot>
    </div>
    <footer>
      <slot name="footer">
        <!-- fallback content -->
        <button class="button is-light" @click="$emit('close')">Close</button>
      </slot>
    </footer>
  </section>
</template>
<style scoped>
.notification {
  width: fit-content;
  margin-left: 10vw;
}
.button {
  margin-top: 16px;
}
</style>
