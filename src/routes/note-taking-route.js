const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkNoteTakingRoute = require('../middleware/checkNoteTakingRoute');
const { validationResult } = require('express-validator');

const noteTakingController = require('../controllers/note-taking-controller');

router.use(authMiddleware);

/** Listar as anotações do usuário autenticado.
 * @summary "Antes de enviar a lista de anotações é iniciado o método de controle 'noteAdd()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com todas as anotações daquele usuário junto com o nome de usuário e email".
 * @returns {Fail} "Mensagem de erro".
 */
router.get('/', async (req, res) => {
  try {
    const list = await noteTakingController.noteList(req, res);

    if (list === 'user not found')
      return res.status(404).send({ error: 'Usuário não encontrado.' });

    return res.send({
      noteTakingList: list.allNoteTaking,
      userInfo: list.userInfo,
    });
  } catch (err) {
    return res.status(500).send({ error: 'Falha ao listar anotações.' });
  }
});

/** Adicionar uma nova anotação.
 * @summary "Antes de atualizar a anotação é verificado se os valores são válidos e em seguida
 * é iniciado o método de controle 'noteAdd()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com a anotação que foi criada".
 * @returns {Fail} "Mensagem de erro".
 */
router.post('/', checkNoteTakingRoute.checkNoteValues(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const noteTakingCreate = await noteTakingController.noteAdd(req, res);

    if (noteTakingCreate === 'user not found')
      return res.status(404).send({ error: 'Usuário não encontrado.' });

    return res.send({ noteTakingCreate });
  } catch (err) {
    return res.status(500).send({ error: 'Falha ao adicionar nova anotação.' });
  }
});

/** Atualizar uma anotação.
 * @summary "Antes de atualizar a anotação é verificado se os valores são válidos e em seguida
 * é iniciado o método de controle 'noteUpdate()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Anotação que foi atualizada".
 * @returns {Fail} "Mensagem de erro".
 */
router.put(
  '/:noteTakingId',
  checkNoteTakingRoute.checkNoteValues(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const noteTakingUpdate = await noteTakingController.noteUpdate(req, res);

      if (noteTakingUpdate === 'not found')
        return res
          .status(404)
          .send({ error: 'Nenhuma anotação não encontrada.' });

      return res.send({ noteTakingUpdate });
    } catch (err) {
      res.status(500).send({ error: 'Falha ao atualizar a anotação.' });
    }
  }
);

/** Deletar uma anotação.
 * @summary "Antes de deletar a anotação é iniciado o método de controle 'noteDelete()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Anotação que foi deletada".
 * @returns {Fail} "Mensagem de erro".
 */
router.delete('/:noteTakingId', async (req, res) => {
  try {
    const noteTakingDeleted = await noteTakingController.noteDelete(req, res);

    if (noteTakingDeleted === 'not found')
      return res.status(400).send({ error: 'Anotação não encontrada.' });

    return res.send({ noteTakingDeleted });
  } catch (err) {
    res.status(500).send({ error: 'Falha ao deletar a anotação.' });
  }
});

module.exports = router;
