import AsideMenu from './AsideMenu/AsideMenu.vue';
import NoteEditor from './NoteEditor/NoteEditor.vue';

export default {
  name: 'Main',
  components: {
    AsideMenu,
    NoteEditor
  },
  methods: {
    reqNoteTakingSelected(data) {
      this.$refs.component_NoteEditor.attNoteEditor(data);
    }
  }
};
