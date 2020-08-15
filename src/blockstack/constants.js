import { AppConfig, UserSession } from 'blockstack';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const SKYLINKS_FILENAME = 'skylinks.json';

export const EXPLORER_URL = 'https://explorer.blockstack.org';