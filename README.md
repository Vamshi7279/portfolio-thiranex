# Accessible Portfolio (Semantic HTML5 + WCAG)

This repository contains a semantic, accessible portfolio skeleton designed to meet modern HTML5 semantics and WCAG best practices.

Files added:

- `index.html` — main semantic HTML5 structure with ARIA attributes and optimized meta tags.
- `styles.css` — accessible focus styles, skip link, and high-contrast defaults.
- `scripts.js` — unobtrusive client-side form validation with ARIA updates.

Testing suggestions:

1. Open `index.html` in a browser and test keyboard navigation (Tab/Shift+Tab), focus outlines, and the skip link.
2. Run Lighthouse (Accessibility and SEO) from Chrome DevTools and address any environment-specific issues.
3. Use a screen reader (NVDA/VoiceOver) to verify landmark navigation and form announcements.

Notes:

- The contact form uses HTML5 validation; `scripts.js` augments aria-invalid and aria-live messaging.
- For full Lighthouse 100 scores, deploy on HTTPS and provide real canonical and social images.
