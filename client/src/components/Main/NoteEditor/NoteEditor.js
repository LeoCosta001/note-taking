import http from '@/services/axiosConfig';
import { VueEditor } from 'vue2-editor';

export default {
  name: 'NoteEditor',
  components: {
    VueEditor
  },
  data() {
    return {
      noteSelected: [],
      appEdit: {
        id: '',
        noteTitle: '',
        noteTag: '',
        noteFavorite: false,
        noteText: ''
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
    /** Método para atualizar os dados do editor de texto.
     * @summary "Os dados são alterados no momento que o usuário seleciona uma nova anotação".
     * @method attNoteEditor
     * @param {*Object} data "Objeto com os novos dados do editor de texto".
     */
    attNoteEditor(data) {
      this.noteSelected = data;
      this.appEdit = {
        id: data._id,
        title: data.title,
        tag: data.tag,
        favorite: data.favorite,
        text: data.text
      };
    },

    /** Salvar anotação.
     * @summary "Atualiza uma anotação do usuário no banco de dados".
     * @method saveNote
     * @return {Sucess} "Emite as informações da anotação atualizada para o componente de listagem
     * de anotações".
     * @returns {Fail} "Exibe um mensagem de Erro".
     */
    saveNote() {
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
          this.$emit('returnNoteTakingSave', res.data.noteTakingUpdate);
        })
        .catch(err => {
          alert(err.response.data.error);
        });
    },

    /** Deletar anotação.
     * @summary "Deleta uma anotação do usuário no banco de dados".
     * @method deleteNote
     * @return {Sucess} "Emite as informações da anotação deletada para o componente de listagem
     * de anotações".
     * @returns {Fail} "Exibe um mensagem de Erro".
     */
    deleteNote() {
      http
        .delete(`note-taking/${this.appEdit.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('US_XXX')}` }
        })
        .then(res => {
          this.$emit('returnNoteTakingDelete', res.data.noteTakingDeleted);
        })
        .catch(err => {
          alert(err.response.data.error);
        });
    }
  }
};
