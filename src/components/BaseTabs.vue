<script setup lang="ts">
import { type PropType, ref } from 'vue';

interface Tab {
  icon: string;
  label: string;
}

const activeTab = ref(0);

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true
  }
});

const emit = defineEmits(['onClick']);

const onClick = (index: number) => {
  activeTab.value = index;
  emit('onClick', props.tabs[index].label);
};
</script>

<template>
  <div class="tabs is-toggle is-fullwidth is-large">
    <ul>
      <li
        v-for="(tab, index) in props.tabs"
        :key="index"
        :class="{ 'is-active': index === activeTab }"
        @click="onClick(index)"
      >
        <a>
          <span class="icon"><i :class="tab.icon" aria-hidden="true"></i></span>
          <span>{{ tab.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tabs {
  width: fit-content;
}
</style>
