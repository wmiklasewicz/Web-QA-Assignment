import { Selector } from 'testcafe';

class NewArticlePage {
  get articleTitleSelector() {
    return Selector('input').withAttribute('formcontrolname', 'title');
  }

  get articleDescriptionSelector() {
    return Selector('input').withAttribute('formcontrolname', 'description');
  }

  get articleBodySelector() {
    return Selector('textarea').withAttribute('formcontrolname', 'body');
  }

  get articleTagsSelector() {
    return Selector('input').withAttribute('placeholder', 'Enter tags');
  }

  get publishArticleButtonSelector() {
    return Selector('button');
  }
}

export default new NewArticlePage();
