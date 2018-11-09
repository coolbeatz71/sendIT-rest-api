import crypto from 'crypto';
import path from 'path';
import App from './app';

const userFilePath = path.resolve(__dirname, '../../files/users.json');

export default class User {
  constructor(firstName, lastName, email, password) {
    const app = new App();
    this.app = app;

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  /**
   * create a user in the server [signUp]
   *
   * @param  string firstName
   * @param  string lastName
   * @param  string email
   * @param  string password
   * @return object
   */
  createUser(firstName, lastName, email, password) {
    this.setUserId();
    const id = this.getUserId();
    let response;
    const userInfo = {
      id,
      firstName,
      lastName,
      email,
      password,
      token: this.getEncryptedToken(email),
    };

    const userData = this.app.readDataFile(userFilePath);

    const isUserExist = userData.find(item => item.email === email);

    if (isUserExist) {
      response = false;
    } else {
      // push new user
      userData.push(userInfo);
      this.app.writeDataFile(userFilePath, userData);
      response = userInfo;
    }
    return response;
  }

  /**
   * get userInfo by email and password [signIn]
   *
   * @param  string email
   * @param  string password
   * @return object
   */
  getUser(email, password) {
    this.email = email;
    this.password = password;

    const userData = this.app.readDataFile(userFilePath);

    userData.forEach((item) => {
      if (item.email === this.email && item.password === this.password) {
        this.userInfo = item;
      }
    });

    return this.userInfo;
  }

  /**
   * get userId by his email
   * @param  string email
   * @return string
   */
  getUserIdByEmail(email) {
    this.email = email;
    let myId;
    const userData = this.app.readDataFile(userFilePath);

    userData.forEach((item) => {
      if (item.email === this.email) {
        myId = item.id;
      }
    });

    return myId;
  }

  /**
   * set the userId
   */
  setUserId() {
    this.userId = String(Math.random()).substr(2, 3);
  }

  /**
   * get the userId
   * @return string
   */
  getUserId() {
    return this.userId;
  }

  getEncryptedToken(email) {
    const cipher = crypto.createCipher('aes192', email);

    this.encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    this.encrypted += cipher.final('hex');

    return this.encrypted;
  }
}
