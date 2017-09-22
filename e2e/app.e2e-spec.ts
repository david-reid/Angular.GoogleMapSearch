import { Example.GoogleMapSearchPage } from './app.po';

describe('example.google-map-search App', () => {
  let page: Example.GoogleMapSearchPage;

  beforeEach(() => {
    page = new Example.GoogleMapSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
