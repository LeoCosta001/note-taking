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
          console.log(err.response.data);
        });
    }
  }
};
