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
