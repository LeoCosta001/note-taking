const bcrypt = require('bcryptjs');
const User = require('../models/user-schema');

/** Resgistrar um novo usuário.
 * @summary "É verificado se o email já está no Banco de dados, em seguida o 'bcrypt' irá criptografar
 * a senha do formulário e salvar os dados deste novo usuário no banco de dados".
 * @access "Todos podem acessar esta rota".
 * @returns {Sucess} "Informações do usuário autenticado sem a key 'password'.
 * @returns {Fail} "Mensagem de erro".
 */
exports.userAdd = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (await User.findOne({ email })) return 'email in use';

    const user = await User.create({
      user: userName,
      email: email,
      password: password,
    });

    user.password = undefined;

    return user;
  } catch (err) {
    res.status(400).send({ error: 'Falha ao resgistrar.' });
  }
};

/** Autenticar login.
 * @summary "É verificado se o email está no Banco de dados, em seguida o 'bcrypt' irá comparar a
 * senha do formulário com a mesma senha daquele usuário que esta criptografada no banco de dados".
 * @access "Todos podem acessar esta rota".
 * @returns {Sucess} "Informações do usuário autenticado sem a key 'password'.
 * @returns {Fail} "Mensagem de erro".
 */
exports.userAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return 'not found';

    if (!(await bcrypt.compare(password, user.password)))
      return 'invalid password';

    user.password = undefined;

    return user;
  } catch (err) {
    res.status(400).send({ error: 'Falha ao resgistrar.' });
  }
};
