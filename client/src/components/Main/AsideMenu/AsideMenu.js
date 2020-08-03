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
    // Filtra a lista de anotações deacordo com o texto digitado no input de pesquisa.
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

    /** Cria anotação.
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

    // Atualizar lista de notas
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
      this.noteList = newNoteList;
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
        this.noteList = res.data.noteTakingList;
        this.emitNoteTaking(0);
      })
      .catch(err => {
        alert(err.response.data.error);
      });
  }
};
