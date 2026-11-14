import i18next from 'i18next';

import { en } from '@/_modules/i18next/locales/en';

/**
 * Synchronous i18next instance for Server Components. Client leaves receive
 * already-translated strings as props, so i18next never ships to the browser.
 */
const i18n = i18next.createInstance();
void i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  initAsync: false,
  resources: { en: { translation: en } },
  interpolation: { escapeValue: false },
});

export const t = i18n.getFixedT('en');
