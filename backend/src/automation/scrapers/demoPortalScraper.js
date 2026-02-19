import { BaseScraper } from './baseScraper.js';

export class DemoPortalScraper extends BaseScraper {
  async search({ keywords, location }) {
    await this.browser.url('https://example.com/jobs');

    return [
      {
        source: 'demo-portal',
        externalId: `demo-${Date.now()}`,
        company: 'Example Labs',
        title: `${keywords} Engineer`,
        location,
        jobUrl: 'https://example.com/jobs/demo-role',
        description: 'Looking for Node.js + React engineer with automation and AI experience.',
      },
    ];
  }
}
