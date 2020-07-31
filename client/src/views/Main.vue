<template>
  <div class="MainView">
    <Main />
  </div>
</template>

<script>
import Main from '@/components/Main/Main.vue';

export default {
  name: 'MainView',
  components: {
    Main
  }
};
</script>

<style lang="scss" scoped>
.MainView {
  width: 100%;
}
</style>
