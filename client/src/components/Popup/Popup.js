export default {
  name: 'Popup',
  data() {
    return {
      popupContent: {
        title: '',
        subTitle: '',
        message: ''
      },
      showPopup: false
    };
  },
  methods: {
    /** Fecha o popup.
     * @method closePopup
     */
    closePopup() {
      this.showPopup = false;
    },

    /** Atualizar as informações do popup.
     * @summary "Usa as informações emitidas dos outros componentes para atualizar o popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.popupContent = popupContent;
      this.showPopup = true;
    }
  }
};
