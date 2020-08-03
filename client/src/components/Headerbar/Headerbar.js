export default {
  name: 'Headerbar',
  data() {
    return {
      userInfo: {
        user: '',
        email: ''
      }
    };
  },
  methods: {
    /** Sair da conta do usuário atual.
     * @summary "Retorna para a página de login e apaga o token de autenticação atual do 'localStorage'".
     * @method newAccount
     */
    logout() {
      this.userInfo = {
        user: '',
        email: ''
      };

      localStorage.removeItem('US_XXX');
      this.$router.push({ path: '/login' });
    },

    /** Atualizar as informações do usuário.
     * @summary "Altera as informações do usuário exebidas no Headerbar".
     * @method attUserInfo
     * @param {*Object} userInfo "Objeto contendo as informações que serão exibidas".
     */
    attUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  }
};
