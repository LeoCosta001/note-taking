<template>
  <div class="NewAccountView">
    <NewAccount @sendOpenPopup="openPopup" />
  </div>
</template>

<script>
import NewAccount from '@/components/NewAccount/NewAccount.vue';

export default {
  name: 'NewAccountView',
  components: {
    NewAccount
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
.NewAccountView {
  width: 100%;
}
</style>
