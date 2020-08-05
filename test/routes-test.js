const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const _forTest = require('./methodsForTest');
const reqTest = require('./routes-test.config');

chai.use(chaiHttp);

/** Teste de requisições.
 * @summary "Inicia um teste com uma requisição para a rota de Login ou de de Nova Conta e com o token de autenticação
 * recebido é iniciado os testes de CRUD com as anotações da aplicação".
 * @requires ./routes-test.config.js "Neste arquivo estará as configurações para realizar os testes".
 */

let reqValues = {
  token: '',
  noteTakingId: '',
};

describe(`Teste de Requisições (${reqTest.path}:${reqTest.port})`, () => {
  if (reqTest.createRandomAccount) {
    reqTest.account = {
      userName: 'Note-Taking-Test',
      email: _forTest.newEmail(),
      password: _forTest.newPassword(),
    };
    console.log({ newAccountInfo: reqTest.account });
  }

  // Teste de criação de conta
  if (reqTest.testCreatingNewAccount) {
    describe('Criar uma nova conta', () => {
      it('(POST) /auth/register', (done) => {
        chai
          .request(`${reqTest.path}:${reqTest.port}`)
          .post('/auth/register')
          .send({
            userName: reqTest.account.userName,
            email: reqTest.account.email,
            password: reqTest.account.password,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.to.have.all.keys('userInfo', 'token');
            res.body.userInfo.should.to.have.all.keys(
              '_id',
              'user',
              'email',
              'createAt',
              '__v'
            );
            res.body.userInfo._id.should.be.a('string').with.lengthOf.above(3);
            res.body.userInfo.user.should.be.a('string').with.lengthOf.above(2);
            res.body.userInfo.email.should.be
              .a('string')
              .with.lengthOf.above(4);
            res.body.userInfo.createAt.should.be
              .a('string')
              .with.lengthOf.above(5);
            res.body.token.should.be.a('string').with.lengthOf.above(37);

            reqValues.token = res.body.token;
            done();
          });
      });
    });
  }

  // Teste de autenticação de login
  describe('Autenticar login', () => {
    it('(POST) /auth/authenticate', (done) => {
      chai
        .request(`${reqTest.path}:${reqTest.port}`)
        .post('/auth/authenticate')
        .send({
          email: reqTest.account.email,
          password: reqTest.account.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.to.have.keys('userAuth', 'token');
          res.body.userAuth.should.have.property('user');
          res.body.userAuth.should.have.property('email');
          res.body.token.should.be.a('string').with.lengthOf.above(37);

          reqValues.token = res.body.token;
          done();
        });
    });
  });

  // Teste de listagem de anotações do usuário autenticado
  describe('Listar anotações do usuário', () => {
    it('(GET) /note-taking', (done) => {
      chai
        .request(`${reqTest.path}:${reqTest.port}`)
        .get('/note-taking')
        .set('Authorization', `Bearer ${reqValues.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.to.have.keys('noteTakingList', 'userInfo');
          res.body.userInfo.should.to.have.all.keys('user', 'email');
          res.body.noteTakingList.should.be.an('array');
          if (res.body.noteTakingList.length !== 0) {
            res.body.noteTakingList.forEach((value) => {
              value.should.to.have.all.keys(
                '_id',
                'title',
                'favorite',
                'tag',
                'text',
                'assignedTo',
                'lastUpdate'
              );
              value._id.should.be.a('string').with.lengthOf.above(3);
              value.title.should.be.a('string').with.lengthOf.above(1);
              value.favorite.should.be.a('boolean');
              value.tag.should.be.a('string').with.lengthOf.above(1);
              value.text.should.be.a('string').with.lengthOf.above(1);
              value.assignedTo.should.be.a('string').with.lengthOf.above(1);
              value.lastUpdate.should.be.a('string').with.lengthOf.above(13);
            });
          }
          done();
        });
    });
  });

  // Teste de criar uma nova anotação
  describe('Criar uma nova anotação', () => {
    it('(POST) /note-taking', (done) => {
      chai
        .request(`${reqTest.path}:${reqTest.port}`)
        .post('/note-taking')
        .send({
          title: 'Anotação de teste',
          tag: 'Lembrete',
          favorite: false,
          text: '<p>Hello World!</p>',
        })
        .set('Authorization', `Bearer ${reqValues.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.to.have.keys('noteTakingCreate');
          res.body.noteTakingCreate.should.be.an('object');
          res.body.noteTakingCreate.should.to.have.all.keys(
            '_id',
            'title',
            'favorite',
            'tag',
            'text',
            'assignedTo',
            'lastUpdate',
            '__v'
          );
          res.body.noteTakingCreate._id.should.be
            .a('string')
            .with.lengthOf.above(3);
          res.body.noteTakingCreate.title.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingCreate.favorite.should.be.a('boolean');
          res.body.noteTakingCreate.tag.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingCreate.text.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingCreate.assignedTo.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingCreate.lastUpdate.should.be
            .a('string')
            .with.lengthOf.above(13);

          reqValues.noteTakingId = res.body.noteTakingCreate._id;
          done();
        });
    });
  });

  // Teste de editar uma anotação
  describe('Editar uma anotação', () => {
    it('(PUT) /note-taking/:noteTakingID', (done) => {
      chai
        .request(`${reqTest.path}:${reqTest.port}`)
        .put(`/note-taking/${reqValues.noteTakingId}`)
        .send({
          title: 'Anotação de teste (Editada)',
          tag: 'Importante',
          favorite: true,
          text: '<p>Hello World! (Editada)</p>',
        })
        .set('Authorization', `Bearer ${reqValues.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.to.have.keys('noteTakingUpdate');
          res.body.noteTakingUpdate.should.be.an('object');
          res.body.noteTakingUpdate.should.to.have.all.keys(
            '_id',
            'title',
            'favorite',
            'tag',
            'text',
            'assignedTo',
            'lastUpdate',
            '__v'
          );
          res.body.noteTakingUpdate._id.should.be
            .a('string')
            .with.lengthOf.above(3);
          res.body.noteTakingUpdate.title.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingUpdate.favorite.should.be.a('boolean');
          res.body.noteTakingUpdate.tag.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingUpdate.text.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingUpdate.assignedTo.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingUpdate.lastUpdate.should.be
            .a('string')
            .with.lengthOf.above(13);
          done();
        });
    });
  });

  // Teste de deletar uma anotação
  describe('Deletar uma anotação', () => {
    it('(DELETE) /note-taking/:noteTakingID', (done) => {
      chai
        .request(`${reqTest.path}:${reqTest.port}`)
        .delete(`/note-taking/${reqValues.noteTakingId}`)
        .set('Authorization', `Bearer ${reqValues.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.to.have.keys('noteTakingDeleted');
          res.body.noteTakingDeleted.should.be.an('object');
          res.body.noteTakingDeleted.should.to.have.all.keys(
            '_id',
            'title',
            'favorite',
            'tag',
            'text',
            'assignedTo',
            'lastUpdate',
            '__v'
          );
          res.body.noteTakingDeleted._id.should.be
            .a('string')
            .with.lengthOf.above(3);
          res.body.noteTakingDeleted.title.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingDeleted.favorite.should.be.a('boolean');
          res.body.noteTakingDeleted.tag.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingDeleted.text.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingDeleted.assignedTo.should.be
            .a('string')
            .with.lengthOf.above(1);
          res.body.noteTakingDeleted.lastUpdate.should.be
            .a('string')
            .with.lengthOf.above(13);
          done();
        });
    });
  });
});
