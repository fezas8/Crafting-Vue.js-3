<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BookingForm from '@/components/BookingForm.vue';
import BookingFormHotel from '@/components/BookingFormHotel.vue';
// import BaseNotification from '@/components/BaseNotification.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseScheduleCard from '@/components/BaseScheduleCard.vue';

const themeClass = ref('is-dark');
provide('themeClass', themeClass);
const submitDetails = ref({
  formData: {},
  onwardFlightData: null,
  returnFlightData: null
});
const title = ref<string>('Where do you want to fly?');
const showResults = ref(false);
const tabs = [
  { icon: 'fas fa-plane', label: 'Flight' },
  { icon: 'fas fa-hotel', label: 'Hotel' }
];

const activeTab = ref(tabs[0].label);

const OnTabClick = (label: string) => {
  activeTab.value = label;
  console.log('activeTab', activeTab.value);
};
const onFormSubmit = (event: any) => {
  submitDetails.value = event;
  console.log('submitDetails', submitDetails.value);
  showResults.value = true;
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
            <div class="form-and-results">
              <Transition name="fade">
                <div class="forms" v-show="!showResults">
                  <BaseTabs :tabs="tabs" @on-click="OnTabClick"> </BaseTabs>
                  <KeepAlive>
                    <component
                      :is="activeTab.toLowerCase() === 'flight' ? BookingForm : BookingFormHotel"
                      @submit="onFormSubmit"
                    ></component>
                  </KeepAlive>
                </div>
              </Transition>
              <Transition name="slide">
                <div v-show="showResults" class="box has-background-white has-text-dark results">
                  <button class="button is-outlined edit-book" @click="showResults = false">
                    Edit booking
                  </button>
                  <div v-if="submitDetails.onwardFlightData">
                    <h2 class="is-size-3">Onward Journey</h2>
                    <BaseScheduleCard
                      :flightList="submitDetails.onwardFlightData?.flights"
                    ></BaseScheduleCard>
                  </div>
                  <div v-if="submitDetails.returnFlightData">
                    <h2 class="is-size-3">Return Journey</h2>
                    <BaseScheduleCard
                      :flightList="submitDetails.returnFlightData?.flights"
                    ></BaseScheduleCard>
                  </div>
                </div>
              </Transition>
            </div>
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
.form-and-results {
  display: flex;
  flex-direction: column;
}
.forms {
  margin-bottom: 32px;
}
.fade-enter-active {
  transition: all 0.8s ease;
}
.fade-leave-active {
  transition: all 0.1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-enter-active {
  transition: all 1.2s ease-in-out;
}
.slide-leave-active {
  transition: all 0.8s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20);
  opacity: 0;
}
.results {
  margin-top: 32px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 16px;
}

.edit-book {
  align-self: flex-end;
}
</style>
