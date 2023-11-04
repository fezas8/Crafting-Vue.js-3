<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BookingForm from '@/components/BookingForm.vue';
import BaseNotification from '@/components/BaseNotification.vue';

type TNotificationDetails = {
  message: string;
  type: string;
  show: boolean;
};

const themeClass = ref('is-link');
const notificationDetails = ref<TNotificationDetails>({
  message: '',
  show: false,
  type: ''
});

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
        <BookingForm @submit="onFormSubmit" />
        <BaseNotification
          v-if="notificationDetails.show"
          :notification-type="notificationDetails.type"
        >
        <template #header>Message: </template>
          {{ notificationDetails.message }}
        </BaseNotification>
      </div>
    </section>
    <section class="section image-section"></section>
  </main>
</template>
<style scoped>
.image-section {
  height: 70vh;
  background-image: linear-gradient(to bottom, rgba(255, 255, 0, 0.5), rgba(0, 0, 255, 0.5)),
    url(https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80);
  background-position: center;
  background-size: cover;
}
</style>
