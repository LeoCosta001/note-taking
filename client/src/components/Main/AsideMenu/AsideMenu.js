export default {
  name: 'AsideMenu',
  data() {
    return {
      noteList: [],
      noteSelected: 0
    };
  },
  computed: {},
  methods: {
    // Emitir anotação selecionada
    emitNoteTaking(index) {
      this.noteSelected = index;
      this.$emit('noteTakingSelected', this.noteList[index]);
    }
  },
  mounted() {
    // Definir a lista de anotações assim que a página é carregada
    const reqNoteList = [
      {
        id: 'ab',
        noteTitle: 'Anotações de teste',
        noteTag: 'Lembrete',
        noteFavorite: false,
        noteText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi iure...Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi iure...'
      },
      {
        id: 'cd',
        noteTitle: 'Datas de aniversários',
        noteTag: 'Lembrete',
        noteFavorite: false,
        noteText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi iure...'
      },
      {
        id: 'ef',
        noteTitle: 'Lista de compras',
        noteTag: 'Importante',
        noteFavorite: false,
        noteText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eligendi iure...'
      }
    ];

    this.noteList = reqNoteList;
    this.emitNoteTaking(0);
  }
};
