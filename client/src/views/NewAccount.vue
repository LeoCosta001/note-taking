<template>
  <div class="NewAccountView">
    <NewAccount />
  </div>
</template>

<script>
import NewAccount from '@/components/NewAccount/NewAccount.vue';

export default {
  name: 'NewAccountView',
  components: {
    NewAccount
  }
};
</script>

<style lang="scss" scoped>
.NewAccountView {
  width: 100%;
}
</style>
