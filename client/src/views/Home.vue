<template>
  <div class="HomeView">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home/Home.vue';

export default {
  name: 'HomeView',
  components: {
    Home
  }
};
</script>

<style lang="scss" scoped>
.HomeView {
  width: 800px;
}
</style>
