# Minimalist engineer portfolio: research notes

Date: 2026-11-14. Scope: what well-regarded minimalist developer portfolios have in common, to set the standard for this site.

## References reviewed

| Site | Takeaway |
|---|---|
| https://brittanychiang.com | Sections About, Experience, Projects, Writing. Experience row = date range, title @ company (linked), short paragraph, tech tags. Projects have a title link, a blurb, tags and sometimes a metric ("100k+ installs"). "View full résumé" links to `/resume.pdf`. Inter. Anchor nav. |
| https://leerob.com | Very text-first: name, a short bio, then dated lists. Monochrome, a narrow centred column, no decoration. |
| https://paco.me | Sections Building, Projects, Writing, Now, Connect. Projects are one-line link + description. Monochrome with one link accent, lots of whitespace, "return to simplicity". |
| https://emilkowal.ski | Bio, Projects (title + one-line tagline), Writing list, social links in the footer. Motion is subtle and purposeful. |
| https://rauno.me | Craft-focused, a monochrome grid, small type, motion used only as detail. |
| https://linkfolio.cv/blog/developer-portfolio-examples-that-got-hired-2026 | Hiring-focused: specific role title, 3–5 projects with problem / role / stack / outcome / live link, one impact line per role, contact visible, put metrics first, avoid long paragraphs. |
| https://dev.to/_d7eb1c1703182e3ce1782/best-developer-portfolio-examples-2026-2d8m, https://colorlib.com/wp/developer-portfolios/, https://elementor.com/blog/best-web-developer-portfolio-examples/ | 2026 roundups: one or two pages, neutral or dark background, sans + mono, projects with stack tags, no stock imagery, one accent colour on a monochrome base. |

## The common standard (what we build to)

**Sections, in order**
1. Hero: name, a specific role title ("Full-stack Engineer, Node.js + React"), a one-line value statement, location/availability, primary links (Résumé PDF, GitHub, LinkedIn, Email).
2. About: 2–3 short paragraphs, first person.
3. Experience: reverse-chronological timeline. Each role = dates, title, company, 2–3 impact bullets with metrics, stack tags.
4. Selected projects (3–5): name, a one-line problem/outcome, your role, a metric, stack tags, links (live / source / case study).
5. Skills: grouped (Languages, Frontend, Backend, Mobile, Infra/Tooling). Plain lists, no progress bars or percentages.
6. Writing (optional, left out here).
7. Contact: email first, socials, résumé again. No contact form needed.

**Visual system**
- Type: one sans for text and one mono for metadata (dates, tags, labels). Geist / Geist Mono or Inter / JetBrains Mono.
- Palette: monochrome neutrals plus one accent used only for links, focus and small highlights.
- Dark and light themes that follow the system setting, with a manual toggle and no flash on load.
- Layout: a single column, max-width about 680–720px, generous vertical rhythm, small section labels in mono.
- Motion: minimal. Hover and focus transitions plus at most a subtle fade-in, and it respects `prefers-reduced-motion`.
- No stock photos, skill bars, heavy UI kits or glassmorphism gimmicks.

**Engineering**
- Static and fast: prerendered HTML, self-hosted fonts, almost no JavaScript (only the theme toggle).
- Accessible: semantic landmarks (`header`/`main`/`section`/`footer`), a skip link, visible focus rings, AA contrast, `aria-label` on icon buttons, real `<a>` links.
- SEO: a unique title and description per page, Open Graph and Twitter cards with an OG image, canonical URL, sitemap and robots.
- Content in typed data files so text can be swapped without touching the layout.
- Résumé PDF linked from the hero and contact (`/resume.pdf`, or one per variant).
