<template>
  <div class="LoginView">
    <Login @sendOpenPopup="openPopup" />
  </div>
</template>

<script>
import Login from '@/components/Login/Login.vue';

export default {
  name: 'LoginView',
  components: {
    Login
  },
  methods: {
    /** Abrir um Popup.
     * @summary "Inicia a função que exibe um popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.$emit('sendOpenPopup', popupContent);
    }
  }
};
</script>

<style lang="scss" scoped>
.LoginView {
  width: 100%;
}
</style>
