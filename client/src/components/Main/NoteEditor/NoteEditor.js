import http from '@/services/axiosConfig';
import { VueEditor } from 'vue2-editor';

export default {
  name: 'NoteEditor',
  components: {
    VueEditor
  },
  data() {
    return {
      noteSelected: {
        id: '',
        title: '',
        tag: '',
        favorite: false,
        text: '',
        lastUpdate: '--/--/---- --:--:--'
      },
      appEdit: {
        id: '',
        title: '',
        tag: '',
        favorite: false,
        text: '',
        lastUpdate: '--/--/---- --:--:--'
      },

      // Status da anotação
      noteStatus: {
        name: 'save',
        edit: false
      },

      // Toolbar do editor de texto
      vueEditorConfig: {
        customToolbar: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['blockquote', 'code-block'],
          ['clean']
        ]
      }
    };
  },
  methods: {
    /** Checar se houve alteração na anotação selecionada.
     * @summary "Se houver diferença entre a anotação selecionada para a original então
     * o Status da anotação se tornará 'Não salvo'.
     * @method checkEdit
     */
    checkEdit() {
      if (
        this.noteSelected.title !== this.appEdit.title ||
        this.noteSelected.tag !== this.appEdit.tag ||
        this.noteSelected.favorite !== this.appEdit.favorite ||
        this.noteSelected.text !== this.appEdit.text
      ) {
        this.noteStatus.edit = true;
      } else {
        this.noteStatus.edit = false;
      }
    },

    /** Método para atualizar os dados do editor de texto.
     * @summary "Os dados são alterados no momento que o usuário seleciona uma nova anotação".
     * @method attNoteEditor
     * @param {*Object} data "Objeto com os novos dados do editor de texto".
     */
    attNoteEditor(data) {
      if (!data) {
        const noData = {
          id: '',
          title: '',
          tag: '',
          favorite: false,
          text: '',
          lastUpdate: '--/--/---- --:--:--'
        };

        this.noteStatus.name = 'noNoteSelect';

        this.noteSelected = noData;
        this.appEdit = noData;
      } else {
        this.noteStatus = {
          name: 'save',
          edit: false
        };
        this.noteSelected = data;
        this.appEdit = {
          id: data._id,
          title: data.title,
          tag: data.tag,
          favorite: data.favorite,
          text: data.text,
          lastUpdate: data.lastUpdate
        };
      }
    },

    /** Salvar anotação.
     * @summary "Atualiza uma anotação do usuário no banco de dados".
     * @method saveNote
     * @return {Sucess} "Emite as informações da anotação atualizada para o componente de listagem
     * de anotações".
     * @returns {Fail} "Exibe um mensagem de Erro".
     */
    saveNote() {
      if (!this.appEdit.id) {
        return this.openPopup({
          title: 'Erro!',
          subTitle: 'Nenhuma anotação selecionada.',
          message: 'Selecione uma anotação antes de salvar.'
        });
      }

      this.noteStatus.name = 'saving';
      http
        .put(
          `note-taking/${this.appEdit.id}`,
          {
            title: this.appEdit.title,
            tag: this.appEdit.tag,
            favorite: this.appEdit.favorite,
            text: this.appEdit.text
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('US_XXX')}` }
          }
        )
        .then(res => {
          this.noteStatus.edit = false;
          this.noteStatus.name = 'save';
          this.attNoteEditor(res.data.noteTakingUpdate);
          this.$emit('returnNoteTakingSave', res.data.noteTakingUpdate);
        })
        .catch(err => {
          this.noteStatus.name = 'error';
          if (err.name === 'Error' && err.message === 'Network Error') {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Falha de conexão.',
              message:
                'Não foi possivel salvar a anotação selecionada porque não foi possivel acessar o servidor.'
            });
          } else if (err.response.data.error) {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Não foi possivel salvar a anotação.',
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

      return undefined;
    },

    /** Deletar anotação.
     * @summary "Deleta uma anotação do usuário no banco de dados".
     * @method deleteNote
     * @return {Sucess} "Emite as informações da anotação deletada para o componente de listagem
     * de anotações".
     * @returns {Fail} "Exibe um mensagem de Erro".
     */
    deleteNote() {
      if (!this.appEdit.id) {
        return this.openPopup({
          title: 'Erro!',
          subTitle: 'Nenhuma anotação selecionada.',
          message: 'Selecione uma anotação antes de deletar.'
        });
      }

      http
        .delete(`note-taking/${this.appEdit.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('US_XXX')}` }
        })
        .then(res => {
          this.attNoteEditor(false);

          this.$emit('returnNoteTakingDelete', res.data.noteTakingDeleted);
        })
        .catch(err => {
          if (err.name === 'Error' && err.message === 'Network Error') {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Falha de conexão.',
              message:
                'Não foi possivel deletar a anotação selecionada porque não foi possivel acessar o servidor.'
            });
          } else if (err.response.data.error) {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Não foi possivel deletar a anotação.',
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

      return undefined;
    },

    /** Abrir um Popup.
     * @summary "Inicia a função que exibe um popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.$emit('sendOpenPopup', popupContent);
    }
  }
};
