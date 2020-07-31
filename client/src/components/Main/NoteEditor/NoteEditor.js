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
    test() {
      console.log(this.appEdit.noteText);
    },
    attNoteEditor(data) {
      this.noteSelected = data;
      this.appEdit = {
        id: data.id,
        noteTitle: data.noteTitle,
        noteTag: data.noteTag,
        noteFavorite: data.noteFavorite,
        noteText: data.noteText
      };
    }
  }
};
