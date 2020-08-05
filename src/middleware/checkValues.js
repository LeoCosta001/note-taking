module.exports = {
  /** Método que verifica se o valor é um email válido.
   * @method email
   * @param {*String} emailString "String que corresponde ao email que será verificado".
   * @param {*Object} localConfig "Objeto com as informações das regras de válidação do email".
   * @argument {Boolean} required "Torna obrigatório ter um email inserido (padrão = false)".
   * @argument {Number} maxLength "Number que corresponde a quantidade máxima de caracteres (padrão = false)".
   * @return {Boolean} "'true' caso o email seja válido".
   *
   ***********************
   * Regras de válidação *
   ***********************
   * - Tem que ser uma string
   * - Minimo 5 caracteres "_@_._"
   * - Ter apenas 1 arroba "@"
   * - Não ter espaço " "
   * - O ponto não pode ser o primeiro nem o ultimo caractere "."
   * - Ter que ter ao menos 1 ponto depois do arroba e eles não podem estar juntos"@_."
   * - Ter no máximo a quantidade de caracteres definido no segundo parâmetro 'maxLength'"
   */
  email(emailString, localConfig = { required: false, maxLength: false }) {
    if (typeof emailString != 'string') return false;
    if (!localConfig.required && emailString.length === 0) return true;
    emailString = emailString.trim();

    if (localConfig.maxLength && emailString.length > localConfig.maxLength)
      return false;

    if (
      emailString.length >= 5 &&
      emailString.includes('@') &&
      emailString.indexOf('@') === emailString.lastIndexOf('@') &&
      !emailString.includes(' ') &&
      emailString[0] != '.' &&
      emailString[emailString.length - 1] != '.' &&
      emailString[0] != '@' &&
      emailString[emailString.length - 1] != '@' &&
      emailString.indexOf('.', emailString.indexOf('@')) != -1 &&
      emailString[emailString.indexOf('@') + 1] != '.'
    ) {
      return true;
    }
    return false;
  },

  /** Método que verifica se o valor é uma string válida.
   * @method string
   * @param {*String} stringValue "String que será verificado".
   * @param {*Object} localConfig "Objeto com as informações das regras de válidação da String".
   * @argument {Boolean} required "Torna obrigatório ter algo escrito na string (padrão = false)".
   * @argument {Number} maxLength "Number que corresponde a quantidade máxima de caracteres (padrão = false)".
   * @argument {Number} minLength "Number que corresponde a quantidade minima de caracteres (padrão = 0)".
   * @argument {Boolean} useTrim "Indica se é necessário usar o método '.trim()' na string (padrão = false)".
   * @return {Boolean} "'true' caso a string seja válido".
   *
   ***********************
   * Regras de válidação *
   ***********************
   * - Ser uma String
   * - Ter a quantidade minima de caracteres maior que o parâmetro 'minLength'
   * - Ter a quantidade máxima de caracteres menor que o parâmetro 'maxLength'
   * - Ser obrigatório ter algo escito caso seja definido o parâmetro 'required' como 'true'
   */
  string(
    stringValue,
    localConfig = {
      required: false,
      maxLength: false,
      minLength: 0,
      useTrim: false,
    }
  ) {
    if (typeof stringValue != 'string') return false;
    if (localConfig.useTrim) stringValue = stringValue.trim();

    if (localConfig.required && stringValue.length < 1) return false;
    if (localConfig.maxLength && stringValue.length > localConfig.maxLength)
      return false;

    return stringValue.length < localConfig.minLength;
  },

  /** Método que verifica se o valor inserido esta entre os valores pré-definidos.
   * @method enum
   * @param {*All} reqValue "Valor que será verificado".
   * @param {*Array} arrayValue "Array com os valores que serão usados para comparação".
   * @return {Boolean} "'true' caso o valor comparado seja encontrado na array".
   */
  enum(reqValue, arrayValue) {
    if (
      !Array.isArray(arrayValue) ||
      reqValue == undefined ||
      !arrayValue.length > 0 ||
      !reqValue.length > 0
    )
      return false;

    let _check = false;

    arrayValue.forEach((value) => {
      if (reqValue === value) _check = true;
    });

    return _check;
  },

  /** Array com as unicas tags possiveis de se armazenar no banco de dados.
   * @enum tag
   */
  tag: ['Lembrete', 'Importante', 'Trabalho', 'Outros'],
};
