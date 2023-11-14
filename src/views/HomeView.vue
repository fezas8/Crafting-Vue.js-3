<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BookingForm from '@/components/BookingForm.vue';
import BookingFormHotel from '@/components/BookingFormHotel.vue';
import BaseNotification from '@/components/BaseNotification.vue';
import BaseTabs from '@/components/BaseTabs.vue';

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

const tabs = [
  { icon: 'fas fa-plane', label: 'Flight' },
  { icon: 'fas fa-hotel', label: 'Hotel' }
];

const activeTab = ref(tabs[0].label);

const OnTabClick = (label: string) => {
  activeTab.value = label;
  console.log('activeTab', activeTab.value);
};

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

            <div class="forms">
              <BaseTabs :tabs="tabs" @on-click="OnTabClick"> </BaseTabs>
              <!-- <KeepAlive
                ><BookingForm v-if="activeTab.toLowerCase() === 'flight'" @submit="onFormSubmit"
              /></KeepAlive>
              <KeepAlive
                ><BookingFormHotel
                  v-if="activeTab.toLowerCase() === 'hotel'"
                  @submit="onFormSubmit"
                ></component>
              </KeepAlive> -->
              <KeepAlive>
                <component
                  :is="activeTab.toLowerCase() === 'flight' ? BookingForm : BookingFormHotel"
                  @submit="onFormSubmit"
                ></component>
              </KeepAlive>
            </div>
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
.forms {
  margin-bottom: 32px;
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
