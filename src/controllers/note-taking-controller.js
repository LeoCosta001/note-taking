const NoteTaking = require('../models/note-taking-schema');
const User = require('../models/user-schema');

/** Listar as anotações do usuário autenticado.
 * @summary "Antes de enviar a lista de anotações é procurado no banco de dados apenas as anotações
 * correspondentes ao usuário autenticado que fez a requisição.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com todas as anotações daquele usuário junto com o nome de usuário e email".
 * @returns {Fail} "Mensagem de erro".
 */
exports.noteList = async (req, res) => {
  try {
    const userSearch = await User.findOne({ _id: req.userId });
    if (!userSearch) return 'user not found';

    const allNoteTaking = await NoteTaking.find(
      {
        assignedTo: req.userId,
      },
      '-__v'
    );

    if (!allNoteTaking) return 'note-taking not found';

    const userInfo = {
      user: userSearch.user,
      email: userSearch.email,
    };

    return {
      allNoteTaking: allNoteTaking,
      userInfo: userInfo,
    };
  } catch (err) {
    res.status(500).send({ error: 'Falha ao listar anotações.' });
  }
};

/** Adicionar uma nova anotação.
 * @summary "No momento em que a anotação é adicionada no Banco de Dados é acresentada a
 * Key 'assignedTo' tendo como valor o relacionamento o ID usuário autenticado" e a
 * Key 'lastUpdate' tendo como valor a data e a hora atual do servidor.
 * @access "Apenas com token válido".
 * @returns {Sucess} "Lista com a anotação que foi criada".
 * @returns {Fail} "Mensagem de erro".
 */
exports.noteAdd = async (req, res) => {
  const { title, tag, favorite, text } = req.body;

  try {
    const userSearch = await User.findOne({ _id: req.userId });
    if (!userSearch) return 'user not found';

    const noteTakingCreate = await NoteTaking.create({
      title: title,
      tag: tag,
      favorite: favorite,
      text: text,
      assignedTo: req.userId,
      lastUpdate: currentDate(),
    });

    return noteTakingCreate;
  } catch (err) {
    res.status(500).send({ error: 'Falha ao adicionar nova anotação.' });
  }
};

/** Atualizar uma anotação.
 * @summary "Antes de atualizar a anotação é verificado se a anotação com o ID enviado pertence ao
 * usuário autenticado, e por fim é adicionada uma nova 'data e hora' na key 'lastUpdate' com a
 * data e hora atual do servidor".
 * @access "Apenas com token válido".
 * @returns {Sucess} "Anotação que foi atualizada".
 * @returns {Fail} "Mensagem de erro".
 */
exports.noteUpdate = async (req, res) => {
  const { title, tag, favorite, text } = req.body;

  try {
    const noteTakingSearch = await NoteTaking.find({
      assignedTo: req.userId,
      _id: req.params.noteTakingId,
    });

    if (!noteTakingSearch.length > 0) return 'not found';

    const noteTakingUpdate = await NoteTaking.findByIdAndUpdate(
      {
        _id: req.params.noteTakingId,
      },
      {
        title: title,
        tag: tag,
        favorite: favorite,
        text: text,
        lastUpdate: currentDate(),
      },
      { new: true }
    );

    return noteTakingUpdate;
  } catch (err) {
    res.status(500).send({ error: 'Falha ao atualizar a anotação.' });
  }
};

/** Deletar uma anotação.
 * @summary "Antes de deletar a anotação é verificado se a anotação com o ID enviado pertence ao usuário autenticado".
 * @access "Apenas com token válido".
 * @returns {Sucess} "Anotação que foi deletada".
 * @returns {Fail} "Mensagem de erro".
 */
exports.noteDelete = async (req, res) => {
  try {
    const noteTakingSearch = await NoteTaking.find(
      {
        assignedTo: req.userId,
        _id: req.params.noteTakingId,
      },
      '-__v'
    );

    if (!noteTakingSearch.length > 0) return 'not found';

    const noteTakingDeleted = await NoteTaking.findByIdAndRemove(
      req.params.noteTakingId
    );
    return noteTakingDeleted;
  } catch (err) {
    res.status(500).send({ error: 'Falha ao deletar a anotação.' });
  }
};

/** Pegar a Data e Hora atual do servidor no formato "DD/MM/AAAA HH:MM:SS".
 * @function currentDate
 * @returns {String} "String de Data e Hora no formato "DD/MM/AAAA HH:MM:SS".
 */
function currentDate() {
  const data = new Date();
  const day = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  const hours = data.getHours();
  const min = data.getMinutes();
  const seg = data.getSeconds();
  return `${day}/${month + 1}/${year} ${hours}:${min}:${seg}`;
}
