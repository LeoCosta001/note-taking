<template>
  <div id="app">
    <Headerbar ref="component_Headerbar" />
    <router-view @sendOpenPopup="openPopup" @userInfo="userInfo" />
    <Popup ref="component_Popup" />
  </div>
</template>

<script>
import Headerbar from '@/components/Headerbar/Headerbar.vue';
import Popup from '@/components/Popup/Popup.vue';

export default {
  components: {
    Headerbar,
    Popup
  },
  methods: {
    /** Atualizar as informações do usuário exibidas no Headerbar.
     * @summary "Altera as informações do usuário que serão exebidas no Headerbar".
     * @method userInfo
     * @param {*Object} data "Objeto contendo as informações que serão exibidas".
     */
    userInfo(data) {
      this.$refs.component_Headerbar.attUserInfo(data);
    },

    /** Abrir um Popup.
     * @summary "Inicia a função que exibe um popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.$refs.component_Popup.openPopup(popupContent);
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
