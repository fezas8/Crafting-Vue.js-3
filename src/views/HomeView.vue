<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BookingForm from '@/components/BookingForm.vue';
import BaseNotification from '@/components/BaseNotification.vue';

const themeClass = ref('is-dark');
provide('themeClass', themeClass);
type TNotificationDetails = {
  message: string;
  type: string;
  show: boolean;
};
const notificationDetails = ref<TNotificationDetails>({
  message: '',
  show: false,
  type: ''
});
const title = ref<string>('Where do you want to fly?');

const onFormSubmit = (event: { notificationDetails: TNotificationDetails }) => {
  notificationDetails.value = event.notificationDetails;
};
</script>

<template>
  <main>
    <section class="hero" :class="themeClass">
      <div class="hero-head">
        <NavBar active-page="Home"></NavBar>
      </div>
      <div class="hero-body">
        <div class="container">
          <div class="content-wrapper">
            <h1 class="title is-1">{{ title }}</h1>
            <p class="subtitle">Let your dreams take flight</p>
            <BookingForm @submit="onFormSubmit" />
            <Transition name="fade">
              <BaseNotification
              v-if="notificationDetails.show"
              :notification-type="notificationDetails.type"
              @close="notificationDetails.show = false"
            >
              {{ notificationDetails.message }}
            </BaseNotification>
            </Transition>
            
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.hero {
  background-image: url('../assets/aircraft.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'content';
  gap: 16px;
}
.content-wrapper {
  grid-area: content;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
