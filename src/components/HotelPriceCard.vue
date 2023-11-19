<script setup lang="ts">
import type { IHotel } from '@/types/common';
const props = defineProps({
  hotelList: {
    type: Array as () => IHotel[],
    required: true
  }
});
</script>
<template>
  <div class="box">
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Hotel Name</th>
          <th>Stars</th>
          <th>Location</th>
          <th>Rating</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.hotelList" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.stars }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.rating }}</td>
          <td>
            <strong>{{ item.price }} / night</strong>
          </td>
          <td>
            <button class="button is-primary">Book</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
