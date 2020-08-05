const { check } = require('express-validator');

exports.authenticate = () => {
  return [
    check('email').isEmail().withMessage('Email inválido'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínimo 5 caracteres.'),
  ];
};

exports.register = () => {
  return [
    check('userName')
      .isString()
      .withMessage('O título está com um valor inválido.')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('O nome de usuário precisa ter entre 3 e 20 caracteres.'),
    check('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínimo 5 caracteres.'),
  ];
};
