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
    attNoteEditor(data) {
      this.noteSelected = data;
      this.appEdit = {
        id: data._id,
        noteTitle: data.title,
        noteTag: data.tag,
        noteFavorite: data.favorite,
        noteText: data.text
      };
    }
  }
};
