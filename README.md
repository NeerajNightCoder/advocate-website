# Advocate website (Patna High Court)

Informational, compliance-minded website for an individual advocate: editorial navy-and-ivory design, English and Hindi (`next-intl`), built with Next.js, TypeScript, and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/hi](http://localhost:3000/hi).

## Before launch

1. Replace placeholders in `src/lib/site-config.ts` with verified professional details.
2. Update education and practice-area lists in `messages/en.json` and `messages/hi.json`.
3. Have a qualified adviser review content against applicable Bar Council of India rules (including permitted website information and non-solicitation).
4. Deploy with HTTPS; add hosting privacy practices if analytics or forms are introduced later.

## Structure

- `src/app/[locale]/` — pages (home, profile, practice areas, contact, privacy, disclaimer)
- `messages/` — English and Hindi copy
- `src/lib/site-config.ts` — advocate name, contact, enrolment placeholders
