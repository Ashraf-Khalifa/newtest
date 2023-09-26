const dbConnection = require("../config");

class UserModel {
  static getUserById(userId, callback) {
    const getUserQuery = `
      SELECT * FROM users
      WHERE id = ?
    `;

    dbConnection.query(getUserQuery, [userId], callback);
  }

  static updateUserToken(email, token, callback) {
    const updateTokenQuery = `
      UPDATE users
      SET token = ?
      WHERE email = ?
    `;

    dbConnection.query(updateTokenQuery, [token, email], callback);
  }

  static deleteUserById(userId, callback) {
    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = ?
    `;

    dbConnection.query(deleteUserQuery, [userId], callback);
  }

  static getUserByEmail(email, callback) {
    const getUserByEmailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;

    dbConnection.query(getUserByEmailQuery, [email], callback);
  }

  static insertUserInfo(values, callback) {
    const userInfoQuery = `
      INSERT INTO users (photoUrl, fullName, number, gender, birthdate, nationality, city, password, email, token, verify)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConnection.query(userInfoQuery, values, callback);
  }
}

module.exports = UserModel;
