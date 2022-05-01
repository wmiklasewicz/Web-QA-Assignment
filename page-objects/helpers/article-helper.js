/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { t } from 'testcafe';
import { LoremIpsum } from 'lorem-ipsum';
import moment from 'moment';
import MainPage from '../main-page';
import NewArticlePage from '../new-article-page';
import GeneralHelper from './general-helper';
import ArticlePage from '../article-page';

const md = require('markdown-it')({
  html: false,
});

const randomText = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 2,
  },
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

class ArticleHelper {
  /**
 * Create a new article or update exisitng with defined or randomly generated data
 * @param {Boolean}  updateData - define if function should update existing article or create a new one
 * @param {String} title - article title, by default will generate random data
 * @param {String} description - article description, by default will generate random data
 * @param {String} body - article body, by default will generate random data
 * @param {Array} tags - array of the tags
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.createOrUpdateArticleAndVerify({ true, 'Cats', 'Cats are awesome', 'Cats love food!', ['#cats', '#peets', '#love'] });
 */
  async createOrUpdateArticleAndVerify({
    updateData = false, title = randomText.generateWords(1), description = randomText.generateSentences(1), body = `# ${randomText.generateSentences(1)}`, tags,
  }) {
    global.title = title;
    global.body = body;
    global.description = description;

    if (updateData === false) {
      await t.click(MainPage.newArticleLinkSelector);
    } else {
      await t.click(ArticlePage.editArticleButtonSelector);
    }

    await t
      .typeText(NewArticlePage.articleTitleSelector, title, { replace: updateData })
      .typeText(NewArticlePage.articleDescriptionSelector, description, { replace: updateData })
      .typeText(NewArticlePage.articleBodySelector, body, { replace: updateData })
      .pressKey('backspace');

    for (const tag of tags) {
      await t
        .typeText(NewArticlePage.articleTagsSelector, tag, { replace: true })
        .pressKey('space');
    }

    await t.click(NewArticlePage.publishArticleButtonSelector);
    await GeneralHelper.checkURL(`${process.env.GLOBAL_URL}/article/`);

    await t.expect(ArticlePage.articleTitleSelector).contains(title);
    const bodySelectorContent = await ArticlePage.articleBodySelector;
    await t
      // Validate if markdown is correctly converted to text
      .expect(`<h1>${bodySelectorContent.replace(/(\n|\r)/gm, '')}.</h1>`).contains(md.render(body).replace(/(\n|\r)/gm, ''))
      .expect(ArticlePage.articleDateSelector).contains(moment().format('LL'));
  }

  /**
 * Create empty article
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.createAndValidateEmptyArticle();
 */
  async createAndValidateEmptyArticle() {
    await t
      .click(MainPage.newArticleLinkSelector)
    // I assume here that publish article button will be disabled once required fields are not filled
      .expect(NewArticlePage.publishArticleButtonSelector.hasAttribute('disabled')).ok();
  }

  /**
 * Validate article on defined feed tab
 * @param {String} feedTabName - feed tab name
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.validateArticleOnFeedTab('Global Feed');
 */
  async validateArticleOnFeedTab(feedTabName) {
    await t
      .click(MainPage.feedTabSelector.withText(feedTabName))
      .expect(MainPage.lastArticleSelector).contains(process.env.TEST_PROFILE);
  }

  /**
 * Delete article
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.deleteArticle();
 */
  async deleteArticle() {
    await t.click(ArticlePage.deleteArticleButtonSelector);
    GeneralHelper.checkURL(process.env.GLOBAL_URL);
  }

  /**
 * Validate if deleted article doesn't exist on the feed tab
 * @param {String} feedName - feed tab name
 * @param {String} articleTitle - title of deleted article, by default it's set to global variable
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.validateDeletedArticleOnFeedTab('Global Feed');
 */
  async validateDeletedArticleOnFeedTab(feedName, articleTitle = global.title) {
    await t
      .click(MainPage.feedTabSelector.withText(feedName))
      .expect(MainPage.articleTitleSelector).notContains(articleTitle);
  }

  /**
 * Validate updated article on feed tab and article details page
 * @param {String} feedName - feed tab name
 * @param {String} articleTitle - article title of updated article, by default it's set to global variable
 * @param {String} articleDescription - article description of updated article, by default it's set to global variable
 * @param {String} articleBody - article body of updated article, by default it's set to global variable
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.validateUpdatedArticle('Global Feed');
 */
  async validateUpdatedArticle(feedName, articleTitle = global.title, articleDescription = global.description, articleBody = global.body) {
    await t
      .navigateTo((process.env.GLOBAL_URL))
      .click(MainPage.feedTabSelector.withText(feedName))
      .expect(MainPage.articleTitleSelector).contains(articleTitle);
    const descriptionSelectorContent = await MainPage.articleDescriptionSelector;
    await t
      .expect(descriptionSelectorContent)
      .contains(articleDescription)
      .click(MainPage.readMoreSelector);
    const bodySelectorContent = await ArticlePage.articleBodySelector;
    await t
    // Validate if markdown is correctly converted to text
      .expect(`<h1>${bodySelectorContent.replace(/(\n|\r)/gm, '')}.</h1>`)
      .contains(md.render(articleBody).replace(/(\n|\r)/gm, ''));
  }

  /**
 * Go to the article details page
 * @example
 * import ArticleHelper from '../page-objects/helpers/article-helper';
 * await ArticleHelper.goToArticleDetailsPage();
 */
  async goToArticleDetailsPage() {
    await t.click(MainPage.readMoreSelector);
    await GeneralHelper.checkURL(`${process.env.GLOBAL_URL}/article/`);
  }
}

export default new ArticleHelper();
