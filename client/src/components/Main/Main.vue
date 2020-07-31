<template>
  <div class="main__component__container">
    <AsideMenu @noteTakingSelected="reqNoteTakingSelected" />
    <NoteEditor ref="component_NoteEditor" />
  </div>
</template>

<script src="./Main"></script>

<style scoped lang="scss">
// Variaveis
@import '@/scss/variables/layoutColors';

// SCSS deste componente
@import './Main';
</style>
