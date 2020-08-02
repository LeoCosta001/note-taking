const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

// Validador de token
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Nenhum token encontrado.' });

  const parts = authHeader.split(' ');
  
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Erro de token.' });

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer))
    return res.status(401).send({ error: 'Formato de token inválido.' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.userId = decoded.id;
    return next();
  });
};
