import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`Smoke test`.page`http://localhost:1234/`;

test('Shows the HomePage when user navigates to path /', async (t) => {
  await t.wait(20);
  await t.expect(Selector('div').textContent).eql('HomePageGo to BlogPage');
});

test('Shows the BlogPage when user navigates to path /blog', async (t) => {
  await t.navigateTo('http://localhost:1234/blog');
  await t.wait(20);
  await t.expect(Selector('div').textContent).eql('BlogPage');
});

test('Shows the BlogArticlePage when user navigates to path /blog/article/some-article', async (t) => {
  await t.navigateTo('http://localhost:1234/blog/article/some-article');
  await t.wait(20);
  await t.expect(Selector('div').textContent).eql('Blog / show article:some-article');
});

test('Jumps to BlogPage when user follows a link to /blog', async (t) => {
  await t.navigateTo('http://localhost:1234/');
  await t.click(Selector('a'));
  await t.wait(20);
  await t.expect(Selector('div').textContent).eql('BlogPage');
});
