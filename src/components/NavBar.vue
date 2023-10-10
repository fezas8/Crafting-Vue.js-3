<script setup lang="ts">
import { onMounted, ref } from 'vue';
const items = ref([
  { name: 'Home', active: false },
  { name: 'About', active: false }
]);
const isHamburgerClicked = ref(false);
const props = defineProps({
  activePage: {
    type: String,
    required: true
  }
});
const toggleItem = (itemName: string) => {
  for (let item of items.value) {
    item.active = item.name.toLowerCase() === itemName.toLowerCase();
  }
}
onMounted(() => {
  toggleItem(props.activePage)
});
</script>
<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          <h2 class="logo is-size-3">VUELINES</h2>
        </a>
        <span
          class="navbar-burger"
          :class="{ 'is-active': isHamburgerClicked }"
          data-target="navbarMenuHeroA"
          @click="isHamburgerClicked = !isHamburgerClicked"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroA" class="navbar-menu" :class="{ 'is-active': isHamburgerClicked }">
        <div class="navbar-end">
          <a
            class="navbar-item"
            :class="{
              'is-active': item.active
            }"
            @click="toggleItem(item.name)"
            v-for="(item, index) in items"
            :key="index"
            >{{ item.name }}</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
}
</style>
