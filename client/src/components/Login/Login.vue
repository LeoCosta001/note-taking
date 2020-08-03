<template>
  <div class="login__component__container">
    <div class="login__container">
      <div class="login__title">Entre na sua conta</div>
      <div class="login__input__container">
        <input
          type="text"
          placeholder="Email"
          spellcheck="false"
          class="login__input__box"
          v-model="email"
        />
      </div>
      <div class="login__input__container">
        <input
          type="password"
          placeholder="Senha"
          spellcheck="false"
          class="login__input__box"
          v-model="password"
        />
      </div>
      <button @click="login()" class="login__button">Entrar</button>
      <div class="login__hr__container">
        <hr />
        <span>ou</span>
        <hr />
      </div>
      <a class="login__link">Criar uma conta</a>
    </div>
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
