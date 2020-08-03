<template>
  <div class="noteeditor__component__container">
    <section class="noteeditor__container">
      <!-- Informações -->
      <div class="noteeditor__input__container">
        <div class="noteeditor__input__title">
          Título:
        </div>
        <input
          type="text"
          placeholder="Escreva um título..."
          spellcheck="false"
          class="noteeditor__input__text"
          v-model="appEdit.title"
        />
      </div>
      <div class="noteeditor__input__container">
        <div class="noteeditor__input__title">
          Tag:
        </div>
        <div class="noteeditor__input__tags">
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Lembrete' }"
            v-on:click="appEdit.tag = 'Lembrete'"
          >
            Lembrete
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Importante' }"
            v-on:click="appEdit.tag = 'Importante'"
          >
            Importante
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Trabalho' }"
            v-on:click="appEdit.tag = 'Trabalho'"
          >
            Trabalho
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Outros' }"
            v-on:click="appEdit.tag = 'Outros'"
          >
            Outros
          </button>
        </div>
      </div>

      <!-- Editor de texto -->
      <div class="noteeditor__app__container">
        <vue-editor
          class="noteeditor__app"
          placeholder="Escreva aqui as suas anotações..."
          v-model="appEdit.text"
          :editorToolbar="vueEditorConfig.customToolbar"
        ></vue-editor>
      </div>
    </section>
  </div>
</template>

<script src="./NoteEditor"></script>

<style scoped lang="scss">
// Variaveis
@import '@/scss/variables/layoutColors';
@import '@/scss/variables/borderStyle';

// SCSS deste componente
@import './NoteEditor';
@import './modifiers';
</style>
