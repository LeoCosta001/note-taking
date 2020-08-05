<template>
  <div class="Popup" v-if="showPopup">
    <section class="popup__container">
      <div class="popup__header__container">
        <div class="popup__header__title">{{ popupContent.title }}</div>
        <button class="close__icon__container" @click="closePopup()">
          <svg class="svg-close-icon" viewBox="0 0 20 20">
            <path
              fill="none"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </button>
      </div>

      <div class="popup__content__container">
        <div class="popup__subtitle">{{ popupContent.subTitle }}</div>
        <div class="popup__content">{{ popupContent.message }}</div>
      </div>
    </section>
  </div>
</template>

<script src="./Popup"></script>

<style lang="scss" scoped>
// Variaveis
@import '@/scss/variables/layoutColors';
@import '@/scss/variables/borderStyle';

// SCSS deste componente
@import './Popup';
</style>
