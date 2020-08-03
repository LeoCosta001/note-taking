<template>
  <div class="LoginView">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login/Login.vue';

export default {
  name: 'LoginView',
  components: {
    Login
  }
};
</script>

<style lang="scss" scoped>
.LoginView {
  width: 100%;
}
</style>
