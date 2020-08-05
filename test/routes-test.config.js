/** Configurações para os testes de requisições.
 * @summary "Configurações para o teste de Rotas do servidor".
 * @requires reqTestConfig "Este é um Objeto com as informações necessarias para a realização dos testes".
 * @param {*Number} port "Porta para se realizar os testes".
 * @param {*String} path "Rota para se realizar os testes".
 * @param {Boolean} testCreatingNewAccount "O valor 'true' indica que é para testar a criação de uma conta nova".
 * @param {Boolean} createRandomAccount "O valor 'true' indica que é para criar uma nova conta randomica para o teste.
 * OBS: Só utilize esta opção juntamente com o 'testCreatingNewAccount: true'.
 * OBS: Se este valor estiver como 'true' então será ignorado a key 'reqTest.account'".
 * @param {Object} account "Informações de login para se realizar os testes.
 * OBS: Se a key 'reqTest.createRandomAccount' estiver com o valor 'true' então esta key será ignorada".
 */
const reqTestConfig = {
  port: 3000,
  path: 'http://localhost',
  testCreatingNewAccount: true,
  createRandomAccount: true,
  account: {
    user: 'test',
    email: 'teste@teste.com',
    password: '12345',
  },
};

module.exports = reqTestConfig;
