<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="field">
    <div class="field-label">
      <label for="check-out">{{ props.label }}</label>
    </div>
    <div class="field-body">
      <div class="control">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.field {
  flex-wrap: wrap;
}
.field-label {
  text-align: start;
  margin-left: 10px;
}
.control {
  margin: 0 10px 10px 10px;
}
</style>
