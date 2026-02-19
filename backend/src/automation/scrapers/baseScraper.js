export class BaseScraper {
  constructor(browser) {
    this.browser = browser;
  }

  async search() {
    throw new Error('search() must be implemented by subclasses');
  }
}
