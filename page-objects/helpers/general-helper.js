import { t, ClientFunction } from 'testcafe';
import MainPage from '../main-page';
import LoginPage from '../login-page';

const getURL = ClientFunction(() => window.location.href);

class GeneralHelper {
  /**
 * Get url link
 * @example
 * import GeneralHelper from '../page-objects/helpers/general-helper';
 * await GeneralHelper.getUrl();
 */
  async getUrl() {
    t.ctx.genericUrl = await getURL();
  }

  /**
 * Verify url link
 * @param {String} link - link to be verified
 * @example
 * import GeneralHelper from '../page-objects/helpers/general-helper';
 * await GeneralHelper.checkURL('https://qa-task.backbasecloud.com/');
 */
  async checkURL(link) {
    await t
      .expect(getURL()).contains(link);
  }

  /**
 * Take screenshot and add to the screenshots folder
 * @param {Boolean} isFullPage - screen resoultion for screenshot, by default fullPage, please notice that chrome doesn't support that option
 * @example
 * import GeneralHelper from '../page-objects/helpers/general-helper';
 * await GeneralHelper.takeScreenshot(isFullPage = false);
 */
  async takeScreenshot(isFullPage = true) {
    await t
      .takeScreenshot({
        path: `screenshots/${Date.now()}.png`,
        fullPage: isFullPage,
      });
  }

  /**
 * Login user to the application
 * @param {String} username - username for application login, by default it will load data from env file
 * @param {String} password - password for application login, by default it will load data from env file
 * @example
 * import GeneralHelper from '../page-objects/helpers/general-helper';
 * await GeneralHelper.loginUser();
 */
  async loginUser(username = process.env.TEST_USER, password = process.env.TEST_PASSWORD) {
    await t
      .click(MainPage.signinLinkSelector)
      .typeText(LoginPage.emailFieldSelector, username)
      .typeText(LoginPage.passwordFieldSelector, password)
      .click(LoginPage.signInButtonSelector);
  }
}

export default new GeneralHelper();
