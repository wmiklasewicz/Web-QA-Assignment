import { Selector } from 'testcafe';

class MainPage {
  get signinLinkSelector() {
    return Selector('a').withAttribute('routerlink', '/login');
  }

  get newArticleLinkSelector() {
    return Selector('a').withAttribute('routerlink', '/editor');
  }

  get feedTabSelector() {
    return Selector('a');
  }

  get lastArticleSelector() {
    return Selector('a').withAttribute('class', 'author').textContent;
  }

  get readMoreSelector() {
    return Selector('span').withText('Read more...');
  }

  get articleTitleSelector() {
    return Selector('a').withAttribute('class', 'preview-link').child('h1').textContent;
  }

  get articleDescriptionSelector() {
    return Selector('a').withAttribute('class', 'preview-link').child('p').textContent;
  }
}

export default new MainPage();
