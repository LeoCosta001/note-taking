import http from '@/services/axiosConfig';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    /** Método para enviar os dados do formulário de login.
     * @summary "Caso a conta seja válida será retornado um token de autenticação".
     * @method login
     */
    login() {
      http
        .post('auth/authenticate', {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem('US_XXX', res.data.token);
          this.$router.push({ path: '/app' });
        })
        .catch(err => {
          if (err.name === 'Error' && err.message === 'Network Error') {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Falha de conexão.',
              message: 'Não foi possivel acessar o servidor.'
            });
          } else if (err.response.data.error) {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Não foi possivel acessar a conta.',
              message: err.response.data.error
            });
          } else {
            this.openPopup({
              title: 'Erro!',
              subTitle: 'Erro no sistema.',
              message: 'Ops! Encontramos um pequeno problema.'
            });
          }
        });
    },

    /** Abrir um Popup.
     * @summary "Inicia a função que exibe um popup".
     * @method openPopup
     * @param {*Object} popupContent "Objeto contendo as informações que serão exibidas".
     */
    openPopup(popupContent) {
      this.$emit('sendOpenPopup', popupContent);
    }
  }
};
