const express = require('express');
const app = express();
const cors = require('cors');
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Configurações
require('dotenv').config();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan
app.use(morgan('tiny'));

// Cors
app.use(cors());

// Redirecionamento de rota para arquivo estático
// (OBS: Este middleware tem que ser executado antes dos arquivos estáticos)
///// app.use(history());

// Arquivos estáticos
///// app.use(express.static(path.join(__dirname + "/client/dist")));

// Database
mongoose.connect(
  process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost/mongodb',
  {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose default connection is open');
});

db.on('error', (err) => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});

// Importar Rotas
const AuthRoutes = require('./routes/auth-route');
app.use('/auth', AuthRoutes);
const NoteTakingRoutes = require('./routes/note-taking-route');
app.use('/note-taking', NoteTakingRoutes);

module.exports = app;
