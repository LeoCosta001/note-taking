import http from '@/services/axiosConfig';

export default {
  name: 'AsideMenu',
  data() {
    return {
      noteList: [],
      noteSelected: 0,
      searchQuery: ''
    };
  },
  computed: {
    // Filtra a lista de anotações de acordo com o texto digitado no input de pesquisa.
    noteListQuery() {
      return this.noteList.filter(value => {
        const valueSearch = value.title.toLowerCase();
        const querySearch = this.searchQuery.toLowerCase();
        return valueSearch.includes(querySearch);
      });
    }
  },
  methods: {
    /** Emitir anotação selecionada.
     * @summary "Os dados são emitidos no momento que o usuário seleciona uma nova anotação
     * e quando o componente é montado".
     * @method emitNoteTaking
     * @param {*Number} index "Number que corresponde ao index da anotação selecionada".
     */
    emitNoteTaking(index) {
      this.noteSelected = index;
      this.$emit('noteTakingSelected', this.noteListQuery[index]);
    },

    /** Cria uma nova anotação.
     * @method noteTakingSave
     */
    noteTakingCreate() {
      http
        .post(
          'note-taking',
          {
            title: 'Nova anotação',
            tag: 'Lembrete',
            favorite: false,
            text: 'Texto de exemplo'
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('US_XXX')}` }
          }
        )
        .then(res => {
          this.noteList.push(res.data.noteTakingCreate);
        })
        .catch(err => {
          alert(err.response.data.error);
        });
    },

    /** Salvar anotação.
     * @summary "Emite o inicio do evento de salvar a anotação que será executado no componente do editor de texto".
     * @method noteTakingSave
     */
    noteTakingSave() {
      this.$emit('noteTakingSave');
    },

    /** Deletar anotação.
     * @summary "Emite o inicio do evento de deletar que será executado no componente do editor de texto".
     * @method noteTakingDelete
     */
    noteTakingDelete() {
      this.$emit('noteTakingDelete');
    },

    /** Atualizar lista de anotações.
     * @summary "Método utilizado por outros componentes para atualizar a lista de anotações"
     * @method attNoteList
     * @param {*Object} data "Objeto com os dados que serão utilizados nos eventos".
     * @param {String} eventName "String que corresponde ao nome do evento".
     */
    attNoteList(data, eventName) {
      let newNoteList = [];

      if (eventName === 'delete') {
        if (this.noteListQuery[this.noteSelected]._id === data._id) this.emitNoteTaking(0);

        newNoteList = this.noteList.filter(value => {
          if (data._id === value._id) return false;
          return true;
        });
      }

      if (eventName === 'save') {
        newNoteList = this.noteList.map(value => {
          if (data._id === value._id) return data;
          return value;
        });
      }

      if (!eventName) newNoteList = data;
      this.noteList = newNoteList;
    },

    /** Alterar cor da tag de acordo com o nome da tag.
     * @method tagColorClass
     * @param {*Number} tagName "String que corresponde ao nome da Tag".
     */
    tagColorClass(tagName) {
      return {
        'tag--color--Lembrete': tagName === 'Lembrete',
        'tag--color--Importante': tagName === 'Importante',
        'tag--color--Trabalho': tagName === 'Trabalho',
        'tag--color--Outros': tagName === 'Outros'
      };
    }
  }
};
