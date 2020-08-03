import AsideMenu from './AsideMenu/AsideMenu.vue';
import NoteEditor from './NoteEditor/NoteEditor.vue';

export default {
  name: 'Main',
  components: {
    AsideMenu,
    NoteEditor
  },
  methods: {
    /** Atualizar dados do editor de texto.
     * @summary "Atualiza o editor de texto de acordo com a anotação selecioanda".
     * @method reqNoteTakingSelected
     * @param {*Object} data "Dados da anotação selecionada".
     */
    reqNoteTakingSelected(data) {
      this.$refs.component_NoteEditor.attNoteEditor(data);
    },

    /** Salvar anotação.
     * @summary "Inicia o evento de salvar a anotação que será executado no componente do editor de texto".
     * @method noteTakingSave
     */
    noteTakingSave() {
      this.$refs.component_NoteEditor.saveNote();
    },

    // Retorno da anotação alterada para atualziar a lista de anotações.
    reqNoteTakingSave(data) {
      this.$refs.component_AsideMenu.attNoteList(data, 'save');
    },

    /** Deletar anotação.
     * @summary "Inicia um evento de deletar que será executado no componente do editor de texto".
     * @method reqNoteTakingDelete
     */
    noteTakingDelete() {
      this.$refs.component_NoteEditor.deleteNote();
    },

    // Retorno da anotação deletada para atualziar a lista de anotações.
    reqNoteTakingDelete(data) {
      this.$refs.component_AsideMenu.attNoteList(data, 'delete');
    }
  }
};
