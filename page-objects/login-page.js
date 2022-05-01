import { Selector } from 'testcafe';

class LoginPage {
  get emailFieldSelector() {
    return Selector('input').withAttribute('formcontrolname', 'email');
  }

  get passwordFieldSelector() {
    return Selector('input').withAttribute('formcontrolname', 'password');
  }

  get signInButtonSelector() {
    return Selector('button').withAttribute('type', 'submit');
  }
}

export default new LoginPage();
