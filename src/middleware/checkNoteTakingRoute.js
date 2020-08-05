const { check } = require('express-validator');
const checkValues = require('./checkValues');

exports.checkNoteValues = () => {
  return [
    check('title')
      .isString()
      .withMessage('O título está com um valor inválido.')
      .isLength({ min: 1, max: 255 })
      .withMessage('O título precisa ter entre 1 e 255 caracteres.'),
    check('tag')
      .isString()
      .custom((value) => {
        let searchValue = false;
        checkValues.tag.forEach((tagName) => {
          if (tagName === value) searchValue = true;
        });
        return searchValue;
      })
      .withMessage('A tag está com um valor inválido.'),
    check('favorite')
      .notEmpty()
      .withMessage('O campo favorito esta vazio.')
      .isBoolean()
      .withMessage('O campo favorito esta com um valor inválido.'),
    check('text')
      .notEmpty()
      .withMessage('Não é possivel salvar uma anotação vazia.')
      .isString()
      .withMessage('A anotação esta com um valor inválido.'),
  ];
};
