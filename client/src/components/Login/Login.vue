<template>
  <div class="login__component__container">
    <form class="login__container" @submit.prevent="login">
      <div class="login__title">Entre na sua conta</div>
      <div class="login__input__container">
        <input
          type="text"
          placeholder="Email"
          name="userEmail"
          spellcheck="false"
          class="login__input__box"
          v-model="email"
        />
      </div>
      <div class="login__input__container">
        <input
          type="password"
          placeholder="Senha"
          name="userPassword"
          spellcheck="false"
          class="login__input__box"
          v-model="password"
        />
      </div>
      <button type="submit" class="login__button">Entrar</button>
      <div class="login__hr__container">
        <hr />
        <span>ou</span>
        <hr />
      </div>
      <router-link to="/new-account" class="login__link">Não tenho uma conta</router-link>
    </form>
  </div>
</template>

<script src="./Login"></script>

<style scoped lang="scss">
// Variaveis
@import '@/scss/variables/layoutColors';
@import '@/scss/variables/borderStyle';

// SCSS deste componente
@import './Login';
@import './modifiers';
</style>
