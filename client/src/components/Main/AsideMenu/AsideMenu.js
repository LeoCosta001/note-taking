import http from '@/services/axiosConfig';

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
        console.log(err.response.data);
      });
  }
};
