export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const THEME_STORAGE_KEY = 'theme';

/** Public repo — linked from the top bar, footer and /benchmark ("View source"). */
export const REPO_URL = 'https://github.com/NoatToan/tony-portfolio';

/** Runs before paint: applies the stored or system theme so there is no flash. */
export const THEME_SCRIPT = `(function(){try{var r=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)');var a=function(){var t=localStorage.getItem('${THEME_STORAGE_KEY}');r.dataset.theme=(t?t==='dark':m.matches)?'dark':'light';};a();m.addEventListener('change',function(){if(!localStorage.getItem('${THEME_STORAGE_KEY}'))a();});}catch(e){}})();`;

/** Lighthouse score bands and Core Web Vitals thresholds (Google). */
export const SCORE_BANDS = { good: 90, ok: 50 } as const;
