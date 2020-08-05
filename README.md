# Note-Taking

## Indice

1.  **Informações**
    1.1 Sobre este projeto
    1.2 Funcionalidades
    1.3 Tecnologias
    1.4 Site
2.  **Como rodar o Servidor**
    2.1 Requisitos
    2.2 Download das dependências
    2.3 Como iniciar o Servidor (Back-end)
    2.4 Como iniciar o Servidor (Front-end)
    2.3 Como fazer o build dos arquivos do Front-end
    2.4 Como iniciar o Servidor no modo "Produção"
3.  **Como rodar os Testes**
    3.1 Teste de Rotas
4.  **Informações adicionais**
    4.1 Navegadores testados

## Informações

**Sobre este projeto:**

- É uma Web Application para armazenar as suas anotações online.

**Funcionalidades:**

- **CRUD:** É possível criar, salvar, editar e deletar cada uma das suas anotações.

* **Login:** Criação de conta e login com autenticação JWT.

- **Informações das anotações:** Cada anotação contém as seguintes informações: Título, Tag, Favorito, Texto e Data e Hora da ultima atualização.

* **Informações das contas:** Cada conta contém as seguintes informações: Nome de usuário, Email e Senha.

**Tecnologias:**

- **Front-end:** VueJs.

* **Back-end:** NodeJs + Express.

- **API Rest:** Express + Axios.

* **Outras API/Lib:** Babel + vue2-editor + Bcryptjs + jsonwebtoken.

- **Banco de Dados:** MongoDB + Mongoose.

* **Testes:** Mocha + Chai.

- **Pré-processador:** SCSS.

* **Linter:** ESlint-airbnb (Usado no Front-end).

- **Status:** Completo.

**Site:** [https://app-note-taking.herokuapp.com/](https://app-note-taking.herokuapp.com/)

## Como rodar o Servidor

**Requisitos:**

- Ter instalado o Node.Js e o NPM [Download](https://nodejs.org/en/download/).

* Ter acesso a um banco de dados MongoDB

> Rodando o Banco de Dados no `http://localhost`

É necessário ter instalado o MongoDB ([Download](https://www.mongodb.com/try/download/community)) e iniciar o `mongod.exe` que é instalado no diretório `MongoDB/Server/4.4(versão do mongo)/bin`.

- **2ª Opção:**

> Rodando o Banco de Dados no MongoDB - Atlas

É necessário ter uma conta no [MongoDb Cloud](https://cloud.mongodb.com/) e usar a Connection String em um arquivo `.env` usando com a key `DATABASE_CONNECTION_STRING`.

**Download das dependências:**

- Baixe o repositório da branch `dev`.

* No repositório local use o comando `npm install`para fazer o download das dependências do Back-end.

- No repositório local use o comando `npm run client-install` para fazer o download das dependências do Front-end.

**Como iniciar o Servidor (Back-end)**

- Para iniciar o servidor no **modo "desenvolvedor"** (usando o Nodemon) digite no terminal: `npm run server-dev`.

**Como iniciar o Servidor (Front-end)**

- Para iniciar o servidor no **modo "desenvolvedor"** digite no terminal: `npm run client-dev`.

* OBS: Caso o Eslint mostre mensagens de erro em que pode ser consertado com o `--fix` então basta usar o comando `npm run client-fix` e espere ser realizada a correção.

Exemplo da mensagem de erro:

![enter image description here](https://i.ibb.co/qYzftKW/Anota-o2-2020-08-05-101532.png)

**Como fazer o build dos arquivos do Front-end**

- Para realizar o build dos arquivos do Front-end digite no terminal: `npm run client-build`.

* OBS: Caso o Eslint mostre mensagens de erro em que pode ser consertado com o `--fix` então basta usar o comando `npm run client-fix` e espere ser realizada a correção.

Exemplo da mensagem de erro:

![enter image description here](https://i.ibb.co/qYzftKW/Anota-o2-2020-08-05-101532.png)

**Como iniciar o Servidor no modo "Produção"**

- Para iniciar o servidor no **modo "produção"** digite o comando: `npm start`.

OBS: Para esta etapa é necessário já ter feito 2 coisas:

- Ter feito o build do Front-end com o comando: `npm run client-build`.

* Criado um arquivo na pasta raiz com o nome `.env` e colocar neste arquivo este código: `RUN_MODE=production` (isso é para que o Back-end execute os arquivos de Build).

## Como rodar os Testes

**Teste de rotas:**

- **Descrição:** Realiza testes no retorno de todas as requisições do Back-end

* Arquivo de testes: `/test/routes-test.js`:

- [x] Criação de conta (é opcional, mas vem ativado por padrão).

* [x] Autenticação de login.

- [x] Listagem de anotações do usuário autenticado.

* [x] Criar uma nova anotação.

- [x] Editar a anotação criada.

* [x] Deletar esta mesma anotação anotação.

- **Requisitos:**

* **1º -** Ter instalado as dependências necessárias para rodar o servidor (inclusive já ter o acesso ao Banco de Dados).

- **2º -** Digitar o comando `npm run test`.

* **Configurações:**

- No arquivo `/test/routes-test.config.js` você pode definir algumas configurações para os testes:

* Porta de acesso _(Padrão: `port: 3000`)_.

- Endereço do servidor _(Padrão: `path: 'http://localhost'`)_.

* Incluir no teste a criação de uma nova conta _(Padrão: `testCreatingNewAccount: true`)_.

- Utilizar no teste uma conta randômica _(Padrão: `createRandomAccount: true`)_.

* Utilizar no teste uma conta pré-definida \*(Padrão: `account: {

user: "test", email: "teste@teste.com", password: "12345"

})`\*.

- Observações:

* Mais informações nos comentários deste mesmo arquivo (`/test/routes-test.config.js`).

- Se definir `createRandomAccount`como `true` então a conta pré-definida não será utilizada.

* Se utilizar a `createRandomAccount` como `true` então será mostrado na hora do teste as informações da conta que foi criada.

- Se utilizar a `testCreatingNewAccount` como `false` e `createRandomAccount` como `true` então sempre dará erro no teste porque tentará autenticar uma conta que não existe.

* **Exemplo:** _(usando o `createRandomAccount: true`)_

![Imagem de um teste realizado](https://i.ibb.co/N96Rmrf/Anota-o-2020-08-05-101532.png)

## Informações adicionais

**Navegadores testados:**

- **Chrome** _(Versão 84.0)_
- **Firefox** _(Versão 78.0)_

- **Microsoft Edge** _(Versão 84.0)_
