import { remote } from 'webdriverio';
import { env } from '../config/env.js';

export const createBrowser = async () => {
  return remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        binary: env.chromeBinary,
        args: ['--headless=new', '--disable-gpu', '--no-sandbox'],
      },
    },
  });
};
