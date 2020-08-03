const authClient = {
  /** Acesso a rota '/app'
   * @summary "Antes de redirecionar é verificado se o localStorage possui algum valor
   * na key 'US_XXX'".
   * @access "Somente com token".
   */
  appAccess(to, from, next) {
    if (localStorage.getItem('US_XXX')) next();
    else next('/login');
  },

  loginPage(to, from, next) {
    next();
  }
};

export default authClient;
