import { HelpcentreFrontPage } from './app.po';

describe('helpcentre-front App', function() {
  let page: HelpcentreFrontPage;

  beforeEach(() => {
    page = new HelpcentreFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
