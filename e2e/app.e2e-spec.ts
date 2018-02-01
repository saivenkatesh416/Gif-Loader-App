import { MovistaGIFLoaderAppPage } from './app.po';

describe('movista-gifloader-app App', () => {
  let page: MovistaGIFLoaderAppPage;

  beforeEach(() => {
    page = new MovistaGIFLoaderAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
