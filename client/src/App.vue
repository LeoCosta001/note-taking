<template>
  <div id="app">
    <Headerbar ref="component_Headerbar" />
    <router-view @userInfo="userInfo" />
  </div>
</template>

<script>
import Headerbar from '@/components/Headerbar/Headerbar.vue';

export default {
  components: {
    Headerbar
  },
  methods: {
    /** Atualizar as informações do usuário exibidas no Headerbar.
     * @summary "Altera as informações do usuário que serão exebidas no Headerbar".
     * @method userInfo
     * @param {*Object} data "Objeto contendo as informações que serão exibidas".
     */
    userInfo(data) {
      this.$refs.component_Headerbar.attUserInfo(data);
    }
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
