<template>
  <div class="PageNotFoundView">
    <section class="notfound__container">
      <div class="notfound__warning__container">
        <div class="notfound__ops">Ops!</div>
        <div class="notfound__warning">
          A página que você<br />está procurando<br />não foi encontrada.
        </div>
      </div>
      <div class="notfound__options">
        Verifique o endereço de URL ou <router-link to="/app">clique aqui</router-link> para ir ao
        Note-Taking.
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PageNotFoundView'
};
</script>

<style lang="scss" scoped>
// Variaveis
@import '@/scss/variables/layoutColors';

.PageNotFoundView {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .notfound__container {
    & .notfound__warning__container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      & .notfound__ops {
        font-size: 10em;
        font-weight: 800;
        margin-bottom: 20px;
      }

      & .notfound__warning {
        font-size: 3em;
        line-height: 1.3em;
        margin-left: 20px;
      }
    }

    & .notfound__options {
      font-size: 1.3em;
      text-align: center;
      margin-top: 40px;

      & a {
        color: $LT_DarkBlue;
        text-decoration: underline;

        &:hover {
          color: $LT_Blue;
        }
      }
    }
  }
}
</style>
