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
      if (this.password !== this.passwordConfirm) {
        return alert('A senha está diferente da senha de confirmação.');
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
          alert(err.response.data.error);
        });
    }
  }
};
