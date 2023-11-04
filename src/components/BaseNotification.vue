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
</script>
<template>
  <section class="notification" :class="classTypes[props.notificationType]">
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
        <button class="button is-link">Ok</button>
      </slot>
    </footer>
  </section>
</template>
<style scoped>
.notification {
  width: fit-content;
  margin: 0 auto;
}
</style>
