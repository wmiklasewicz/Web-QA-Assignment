import * as dotEnv from 'dotenv';
import GeneralHelper from '../page-objects/helpers/general-helper';
import ArticleHelper from '../page-objects/helpers/article-helper';

dotEnv.config();
const dataSet = require('../test-data/test-data.json');

fixture('CRUD operations for articles')
  .httpAuth({
    username: process.env.GLOBAL_USER,
    password: process.env.GLOBAL_PASSWORD,
  })
  .page(process.env.GLOBAL_URL)

  .beforeEach(async () => {
    await GeneralHelper.loginUser();
    await GeneralHelper.checkURL(process.env.GLOBAL_URL);
  });

dataSet.forEach((data) => {
  test(`Test case 1 | BWQA-3: Create a new article | data set: ${data.dataSet}`, async (t) => {
    await ArticleHelper.createOrUpdateArticleAndVerify({ tags: [data.tag1, data.tag2] });
    await t.navigateTo(process.env.GLOBAL_URL);
    // Check data for both tabs
    await ArticleHelper.validateArticleOnFeedTab('Global Feed');
    await ArticleHelper.validateArticleOnFeedTab('Your Feed');
    await GeneralHelper.takeScreenshot();
  });
});

dataSet.forEach((data) => {
  test(`Test case 2 | BWQA-4: Read article | data set: ${data.dataSet}`, async (t) => {
    await ArticleHelper.createOrUpdateArticleAndVerify({ tags: [data.tag1] });
    await t.navigateTo(process.env.GLOBAL_URL);
    // Check data for both tabs
    await ArticleHelper.validateArticleOnFeedTab('Global Feed');
    await ArticleHelper.validateArticleOnFeedTab('Your Feed');
    await ArticleHelper.goToArticleDetailsPage();
  });
});

dataSet.forEach((data) => {
  test(`Test case 3 | BWQA-8: Delete article | data set: ${data.dataSet}`, async () => {
    await ArticleHelper.createOrUpdateArticleAndVerify({ tags: [data.tag1] });
    await ArticleHelper.deleteArticle();
    // Check data for both tabs
    await ArticleHelper.validateDeletedArticleOnFeedTab('Global Feed');
    await ArticleHelper.validateDeletedArticleOnFeedTab('Your Feed');
  });
});

dataSet.forEach((data) => {
  test(`Test case 4 | BWQA-9: Update article | data set: ${data.dataSet}`, async () => {
    await ArticleHelper.createOrUpdateArticleAndVerify({ tags: [data.tag1] });
    // Update already created article and validate
    await ArticleHelper.createOrUpdateArticleAndVerify({ updateData: true, tags: [data.tag1] });
    await ArticleHelper.validateUpdatedArticle('Global Feed');
    await ArticleHelper.validateUpdatedArticle('Your Feed');
    await GeneralHelper.takeScreenshot();
  });
});

dataSet.forEach((data) => {
  test(`Test case 5 | BWQA-12: Create empty article | data set: ${data.dataSet}`, async () => {
    await ArticleHelper.createAndValidateEmptyArticle();
  });
});
