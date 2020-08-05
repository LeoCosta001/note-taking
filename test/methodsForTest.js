const methodsForTest = {
  newEmail() {
    const getTime = new Date().getTime().toString();
    const email = `test${getTime.slice(-3)}@test${getTime.slice(-7)}.com`;
    return email;
  },
  
  newPassword() {
    const getTime = new Date().getTime().toString();
    const password = `${getTime.slice(-8)}test${getTime.slice(-3)}${getTime.slice(-2)}`;
    return password;
  },
};

module.exports = methodsForTest;
