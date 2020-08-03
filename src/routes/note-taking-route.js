const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkValues = require('../middleware/checkValues');

const noteTakingController = require('../controllers/note-taking-controller');

router.use(authMiddleware);

/** Listar as anotações do usuário autenticado.
 * @summary "Antes de enviar a lista de anotações é iniciado o método de controle 'noteAdd()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com todas as anotações daquele usuário".
 * @returns {Fail} "Mensagem de erro".
 */
router.get('/', async (req, res) => {
  try {
    const noteTakingList = await noteTakingController.noteList(req, res);

    return res.send({ noteTakingList });
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao listar anotações.' });
  }
});

// Listar todas as anotações (rota temporária) //
const NoteTaking = require('../models/note-taking-schema');
router.get('/all', async (req, res) => {
  try {
    const noteTaking = await NoteTaking.find().populate('assignedTo');

    return res.send({ noteTaking });
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao listar anotações.' });
  }
});
// ------------------------------------------- //

/** Adicionar uma nova anotação.
 * @summary "Antes de atualizar a anotação é verificado se os valores são válidos e em seguida
 * é iniciado o método de controle 'noteAdd()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com a anotação que foi criada".
 * @returns {Fail} "Mensagem de erro".
 */
router.post('/', async (req, res) => {
  const { title, tag, favorite, text } = req.body;

  if (
    !checkValues.string(title, {
      required: true,
      minLength: 1,
      maxLength: 255,
      useTrim: true,
    })
  )
    return res.status(400).send({ error: 'Título inválido.' });

  if (!checkValues.enum(tag, checkValues.tag))
    return res.status(400).send({ error: 'Tag inválida.' });

  if (typeof favorite !== 'boolean')
    return res.status(400).send({ error: 'Favorito inválido.' });

  if (typeof text !== 'string' || !text.length > 0)
    return res.status(400).send({ error: 'Texto inválido.' });

  try {
    const noteTakingCreate = await noteTakingController.noteAdd(req, res);

    return res.send({ noteTakingCreate });
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao adicionar nova anotação.' });
  }
});

/** Atualizar uma anotação.
 * @summary "Antes de atualizar a anotação é verificado se os valores são válidos e em seguida
 * é iniciado o método de controle 'noteUpdate()'.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Anotação que foi atualizada".
 * @returns {Fail} "Mensagem de erro".
 */
router.put('/:noteTakingId', async (req, res) => {
  const { title, tag, favorite, text } = req.body;

  if (
    !checkValues.string(title, {
      required: true,
      minLength: 1,
      maxLength: 255,
      useTrim: true,
    })
  )
    return res.status(400).send({ error: 'Título inválido.' });

  if (!checkValues.enum(tag, checkValues.tag))
    return res.status(400).send({ error: 'Tag inválida.' });

  if (typeof favorite !== 'boolean')
    return res.status(400).send({ error: 'Favorito inválido.' });

  if (typeof text !== 'string' || !text.length > 0)
    return res.status(400).send({ error: 'Texto inválido.' });

  try {
    const noteTakingUpdate = await noteTakingController.noteUpdate(req, res);

    if (noteTakingUpdate === 'not found')
      return res.status(400).send({ error: 'Anotação não encontrada.' });

    return res.send({ noteTakingUpdate });
  } catch (err) {
    res.status(400).send({ error: 'Falha ao atualizar a anotação.' });
  }
});

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
    res.status(400).send({ error: 'Falha ao deletar a anotação.' });
  }
});

module.exports = router;
