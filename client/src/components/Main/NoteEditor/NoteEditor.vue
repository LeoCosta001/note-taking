<template>
  <div class="noteeditor__component__container">
    <!-- Visualizador de status da anotação -->
    <section class="noteeditor__status__container">
      <div class="noteeditor__current__status__container">
        Status:
        <!-- Status: Salvo -->
        <span
          class="noteeditor__current__status__save"
          v-if="noteStatus.name === 'save' && !noteStatus.edit"
        >
          <svg class="svg-status-icon" viewBox="0 0 20 20">
            <path
              d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"
            ></path>
          </svg>
          Salvo
        </span>

        <!-- Status: Salvando... -->
        <span class="noteeditor__current__status__saving" v-if="noteStatus.name === 'saving'">
          <svg class="svg-status-icon" viewBox="0 0 20 20">
            <path
              fill="none"
              d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"
            ></path>
          </svg>
          Salvando...
        </span>

        <!-- Status: Alterações não salvas -->
        <span
          class="noteeditor__current__status__edit"
          v-if="noteStatus.edit === true && noteStatus.name === 'save'"
        >
          <svg class="svg-status-icon" viewBox="0 0 20 20">
            <path
              d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
            ></path>
          </svg>
          Alterações não salvas
        </span>

        <!-- Status: Erro -->
        <span class="noteeditor__current__status__error" v-if="noteStatus.name === 'error'">
          <svg class="svg-status-icon" viewBox="0 0 20 20">
            <path
              d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
            ></path>
          </svg>
          Erro ao salvar anotação, tente novamente.
        </span>

        <!-- Status: Nenhuma anotação selecionada -->
        <span class="noteeditor__current__status__error" v-if="noteStatus.name === 'noNoteSelect'">
          <svg class="svg-status-icon" viewBox="0 0 20 20">
            <path
              d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
            ></path>
          </svg>
          Nenhuma anotação selecionada.
        </span>
      </div>

      <!-- Exibidor de ultima atualização -->
      <div class="noteeditor__last__update" v-if="appEdit.lastUpdate">
        <span class="noteeditor__last__update__title">Salvo em:</span>
        <span class="noteeditor__last__update__content">
          {{ appEdit.lastUpdate.split(' ')[0] }}
        </span>
        <span class="noteeditor__last__update__title">ás</span>
        <span class="noteeditor__last__update__content">
          {{ appEdit.lastUpdate.split(' ')[1] }}</span
        >
      </div>
    </section>

    <!-- Editor de anotações -->
    <section class="noteeditor__container" v-if="appEdit.id">
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
          v-on:keyup="checkEdit()"
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
            @click="checkEdit()"
          >
            Lembrete
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Importante' }"
            v-on:click="appEdit.tag = 'Importante'"
            @click="checkEdit()"
          >
            Importante
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Trabalho' }"
            v-on:click="appEdit.tag = 'Trabalho'"
            @click="checkEdit()"
          >
            Trabalho
          </button>
          <button
            class="noteeditor__input__tags"
            :class="{ 'noteeditor--tag--selected': appEdit.tag === 'Outros' }"
            v-on:click="appEdit.tag = 'Outros'"
            @click="checkEdit()"
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
          :text-change="checkEdit()"
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
