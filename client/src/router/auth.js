const authClient = {
  /** Acesso a rota '/login'
   * @summary "Antes de redirecionar é apagado o token de autenticação do localStorage na key 'US_XXX'".
   * @access "Livre".
   */
  loginPage(to, from, next) {
    localStorage.removeItem('US_XXX');
    next();
  },

  /** Acesso a rota '/new-account'
   * @summary "Antes de redirecionar é apagado o token de autenticação do localStorage na key 'US_XXX'".
   * @access "Livre".
   */
  newAccountPage(to, from, next) {
    localStorage.removeItem('US_XXX');
    next();
  },

  /** Acesso a rota '/app'
   * @summary "Antes de redirecionar é verificado se o localStorage possui algum valor
   * na key 'US_XXX'".
   * @access "Somente com token".
   */
  appAccess(to, from, next) {
    if (localStorage.getItem('US_XXX')) next();
    else next('/login');
  }
};

export default authClient;
