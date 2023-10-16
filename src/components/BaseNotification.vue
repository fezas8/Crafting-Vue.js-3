<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    notificationType: {
      type: String,
      default: 'success',
      validator: (value: string) =>  {
        return ['success', 'warning', 'info', 'error'].includes(value);
      }
    },
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      classTypes: {
        success: 'is-success',
        warning: 'is-warning',
        info: 'is-info',
        error: 'is-danger'
      } as { [key: string]: string }
    };
  }
});
</script>
<template>
  <div class="notification" :class="classTypes[notificationType]">{{ message }}</div>
</template>
<style scoped>
.notification {
  width: fit-content;
  margin: 0 auto;
}
</style>
