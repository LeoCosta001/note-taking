<template>
  <div class="main__component__container">
    <AsideMenu
      @noteTakingSelected="reqNoteTakingSelected"
      @noteTakingSave="noteTakingSave"
      @noteTakingDelete="noteTakingDelete"
      ref="component_AsideMenu"
    />
    <NoteEditor
      ref="component_NoteEditor"
      @returnNoteTakingSave="reqNoteTakingSave"
      @returnNoteTakingDelete="reqNoteTakingDelete"
    />
  </div>
</template>

<script src="./Main"></script>

<style scoped lang="scss">
// Variaveis
@import '@/scss/variables/layoutColors';

// SCSS deste componente
@import './Main';
</style>
