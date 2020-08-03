<template>
  <div class="MainView">
    <Main @userInfo="userInfo" />
  </div>
</template>

<script>
import Main from '@/components/Main/Main.vue';

export default {
  name: 'MainView',
  components: {
    Main
  },
  methods: {
    /** Atualizar as informações do usuário exibidas no Headerbar.
     * @summary "Altera as informações do usuário que serão exebidas no Headerbar".
     * @method userInfo
     * @param {*Object} data "Objeto contendo as informações que serão exibidas".
     */
    userInfo(data) {
      this.$emit('userInfo', data);
    }
  }
};
</script>

<style lang="scss" scoped>
.MainView {
  width: 100%;
}
</style>
