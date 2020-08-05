import http from '@/services/axiosConfig';

export default {
  name: 'NewAccount',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    /** Método para enviar os dados do formulário de criação de conta.
     * @summary "Caso a conta seja válida será retornado um token de autenticação".
     * @method newAccount
     */
    newAccount() {
      if (this.userName.length <= 2) {
        return this.openPopup({
          title: 'Erro!',
          subTitle: 'Formulário inválido.',
          message: 'O nome de Usuário precisa ter mais de 2 digitos.'
        });
      }

      if (this.password.length <= 4) {
        return this.openPopup({
          title: 'Erro!',
          subTitle: 'Formulário inválido.',
          message: 'A senha precisa ter mais de 4 digitos.'
        });
      }

      if (this.password !== this.passwordConfirm) {
        return this.openPopup({
          title: 'Erro!',
          subTitle: 'Formulário inválido.',
          message: 'A senha está diferente da senha de confirmação.'
        });
      }

      return http
        .post('auth/register', {
          userName: this.userName,
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
              subTitle: 'Não foi possivel criar a conta.',
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
