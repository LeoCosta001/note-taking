const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const checkValues = require('../middleware/checkValues');
const authController = require('../controllers/auth-controller');

const User = require('../models/user-schema');

/** Resgistrar um novo usuário.
 * @summary "Sempre que um formulário de Nova Conta for recebido será iniciado o método de
 * controle 'userAdd()', e por fim o 'JWT' irá gerar um novo token para o usuário".
 * @access "Todos podem acessar esta rota".
 * @returns {Sucess} "Informações do usuário autenticado e a key 'token' com um novo Token JWT".
 * @returns {Fail} "Mensagem de erro".
 */
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  if (
    !checkValues.string(userName, {
      required: true,
      minLength: 3,
      maxLength: 20,
      useTrim: true,
    })
  )
    return res.status(400).send({ error: 'Nome de usuário inválido.' });

  if (
    !checkValues.email(email, {
      required: true,
      maxLength: 255,
    })
  )
    return res.status(400).send({ error: 'Email inválido.' });

  if (
    !checkValues.string(password, {
      required: true,
      minLength: 5,
    })
  )
    return res.status(400).send({ error: 'Senha inválida.' });
  try {
    const userInfo = await authController.userAdd(req, res);

    if (userInfo === 'email in use')
      return res.status(409).send({ error: 'Este email já está cadastrado.' });

    res.send({ userInfo, token: generateToken({ id: userInfo.id }) });
  } catch (err) {
    res.status(500).send({ error: 'Falha ao resgistrar.' });
  }
});

/** Autenticar login.
 * @summary "Sempre que um formulário de login for recebido será iniciado o método de
 * controle 'userAdd()' e por fim será gerado um novo token de acesso para o usuário autenticado".
 * @access "Todos podem acessar esta rota".
 * @returns {Sucess} "Informações do usuário autenticado e a key 'token' com um novo Token JWT".
 * @returns {Fail} "Mensagem de erro".
 */
router.post('/authenticate', async (req, res) => {
  try {
    const userAuth = await authController.userAuth(req, res);

    if (userAuth === 'not found')
      return res.status(404).send({ error: 'Usuário não encontrado.' });

    if (userAuth === 'invalid password')
      return res.status(400).send({ error: 'Senha inválida.' });

    res.send({ userAuth, token: generateToken({ id: userAuth.id }) });
  } catch (err) {
    res.status(500).send({ error: 'Falha ao autenticar login.' });
  }
});

/** Gerar token JWT autenticado.
 * @summary "Gera um token JWT com validade de 24 horas usando como base uma 'hash MD5' e o ID do usuário".
 * @function generateToken
 * @returns {String} "String com um token JWT".
 */
function generateToken(userId = {}) {
  return jwt.sign(userId, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = router;
