<template>
  <div class="newacc__component__container">
    <form class="newacc__container" autocomplete="off" @submit.prevent="newAccount">
      <div class="newacc__title">Crie sua conta</div>
      <div class="newacc__input__container">
        <input
          type="text"
          placeholder="Usuário"
          spellcheck="false"
          class="newacc__input__box"
          v-model="userName"
        />
      </div>
      <div class="newacc__input__container">
        <input
          type="text"
          placeholder="Email"
          name="userEmail"
          spellcheck="false"
          class="newacc__input__box"
          v-model="email"
        />
      </div>
      <div class="newacc__input__container">
        <input
          type="password"
          placeholder="Senha"
          name="userPassword"
          spellcheck="false"
          class="newacc__input__box"
          v-model="password"
        />
      </div>
      <div class="newacc__input__container">
        <input
          type="password"
          placeholder="Confirme a senha"
          name="userPasswordConfirm"
          spellcheck="false"
          class="newacc__input__box"
          v-model="passwordConfirm"
        />
      </div>
      <button type="submit" class="newacc__button">Criar conta</button>
      <div class="newacc__hr__container">
        <hr />
        <span>ou</span>
        <hr />
      </div>
      <router-link to="/login" class="newacc__link">Eu já tenho uma conta</router-link>
    </form>
  </div>
</template>

<script src="./NewAccount"></script>

<style scoped lang="scss">
// Variaveis
@import '@/scss/variables/layoutColors';
@import '@/scss/variables/borderStyle';

// SCSS deste componente
@import './NewAccount';
@import './modifiers';
</style>
