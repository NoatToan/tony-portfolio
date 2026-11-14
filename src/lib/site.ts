export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Tony Nguyen";

/** Runs before paint to apply the stored/system theme without a flash. */
export const themeScript = `(function(){try{var r=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)');var a=function(){var t=localStorage.getItem('theme');r.dataset.theme=(t?t==='dark':m.matches)?'dark':'light';};a();m.addEventListener('change',function(){if(!localStorage.getItem('theme'))a();});}catch(e){}})();`;
