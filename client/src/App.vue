<template>
  <div id="app">
    <Headerbar />
    <router-view />
  </div>
</template>

<script>
import Headerbar from '@/components/Headerbar/Headerbar.vue';

export default {
  components: {
    Headerbar
  }
};
</script>

<style lang="scss">
// Variáveis
@import '@/scss/variables/layoutColors';
@import '@/scss/variables/borderStyle';

// CSS Global
@import '@/scss/fonts/fontsImport';
@import '@/scss/global/resetStyle';
@import '@/scss/global/globalStyle';
</style>
