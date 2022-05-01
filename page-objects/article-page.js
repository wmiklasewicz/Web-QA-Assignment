import { Selector } from 'testcafe';

class ArticlePage {
  get articleTitleSelector() {
    return Selector('div').withAttribute('class', 'container').child('h1').textContent;
  }

  get articleBodySelector() {
    return Selector('div').withAttribute('class', 'col-md-12').child('div').textContent;
  }

  get articleDateSelector() {
    return Selector('span').withAttribute('class', 'date').textContent;
  }

  get deleteArticleButtonSelector() {
    return Selector('button').withAttribute('class', 'btn btn-sm btn-outline-danger');
  }

  get editArticleButtonSelector() {
    return Selector('a').withAttribute('class', 'btn btn-sm btn-outline-secondary');
  }
}

export default new ArticlePage();
