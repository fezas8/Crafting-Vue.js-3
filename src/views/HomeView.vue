<script lang="ts">
export default {
  data() {
    return {
      bookBtnContent: 'Book a flight',
      captions: [
        'Soar for less',
        'Ready to takeoff',
        'Let your dreams take flight',
        'Escape to your dreams'
      ],
      title: ''
    }
  },
  methods: {
    getTitleContent: function () {
      return this.captions[this.captions.length - 1]
    }
  },
  mounted() {
    this.title = this.getTitleContent()
    let intervalId = setInterval(() => {
      this.title = this.getTitleContent()
      this.captions.pop()
      console.log('title', this.title)
      console.log('captions', this.captions)
    }, 1000)

    setTimeout(() => {
      clearInterval(intervalId)
    }, 4000)
  }
}
</script>
<template>
  <main>
    <section class="hero is-fullheight">
      <div class="hero-head">
        <div class="container">
          <figure class="image is-64x64">
            <img src="../assets/logo.png" alt="Logo" />
          </figure>
        </div>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">{{ title }}</h1>
          <button class="button is-link is-medium">{{ bookBtnContent }}</button>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
.hero {
  background-image: url(https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3088&q=80);
  background-position: center;
  background-size: cover;
}
.image {
  margin: 16px;
}
</style>
