import http from '@/services/axiosConfig';
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
     * @method noteTakingDelete
     */
    noteTakingDelete() {
      this.$refs.component_NoteEditor.deleteNote();
    },

    // Retorno da anotação deletada para atualziar a lista de anotações.
    reqNoteTakingDelete(data) {
      this.$refs.component_AsideMenu.attNoteList(data, 'delete');
    },

    /** Abrir um Popup.
     * @summary "Inicia a função que exibe um popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.$emit('sendOpenPopup', popupContent);
    }
  },

  mounted() {
    // Usando o token para buscar todas as anotações do usuário
    http
      .get('note-taking', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('US_XXX')}`
        }
      })
      .then(res => {
        this.$refs.component_AsideMenu.attNoteList(res.data.noteTakingList);
        this.$refs.component_AsideMenu.emitNoteTaking(0);
        this.$emit('userInfo', res.data.userInfo);
      })
      .catch(err => {
        this.noteStatus.name = 'error';
        if (err.name === 'Error' && err.message === 'Network Error') {
          this.openPopup({
            title: 'Erro!',
            subTitle: 'Falha de conexão.',
            message: 'Não foi possivel listar as suas anotações, tente novamente.'
          });
        } else if (err.response.data.error) {
          this.openPopup({
            title: 'Erro!',
            subTitle: 'Não foi possivel listar as suas anotação.',
            message: err.response.data.error
          });
        } else {
          this.openPopup({
            title: 'Erro!',
            subTitle: 'Erro no sistema.',
            message: 'Ops! Encontramos um pequeno problema.'
          });
        }
      });
  }
};
