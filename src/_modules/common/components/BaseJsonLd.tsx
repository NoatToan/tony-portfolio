/**
 * Base primitive for a `<script type="application/ld+json">` tag — the only place raw JSON-LD is
 * emitted.
 *
 * JUSTIFIED EXCEPTION (not sanitized with DOMPurify): `data` is always this site's own editorial
 * content (Person/Credential schema built from the mock portfolio data in
 * `_modules/server/content/`), never third-party or visitor-supplied input, so there is no
 * injection surface to sanitize against. A `<script type="application/ld+json">` body is parsed
 * as JSON text by crawlers, not as HTML/JS, so an HTML sanitizer would not apply here regardless
 * — the one real risk is a literal `</script>` breaking out of the tag, which the `<` escape
 * below neutralizes.
 */
export default function BaseJsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
