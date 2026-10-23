# International SEO + GEO Strategy

**Domain:** epic-studio.in  
**Canonical host:** https://www.epic-studio.in  
**Last updated:** 2026-10-23

## 1. The honest constraint

No agency can guarantee **#1 in Google** for competitive commercial terms. Rankings are decided by Google's systems, competitor behaviour, link authority, brand demand and query context. Anyone who guarantees position #1 is misunderstanding search or misrepresenting it.

What can be engineered:

- Correct international site architecture
- Region pages with genuine local context
- `hreflang`, canonical and geo signals that do not conflict
- Entity consistency across the web
- Content that answers the exact commercial questions buyers ask
- Technical quality: speed, accessibility, crawlability, structured data
- Measurement that shows which markets and queries are improving

Safari does not have its own search index — it uses Google (and Bing in some configurations). Ranking in Google and Bing covers Safari. AI platforms are covered separately through GEO.

## 2. Architecture chosen

**One global English site + region pages.** Not separate country domains, not duplicated country subfolders.

```
/                                   Global homepage
/services/*                         Global service pages (6)
/work/*                             Global case studies (3)
/locations                          Global coverage hub
/locations/united-states            en-US
/locations/united-kingdom           en-GB
/locations/europe                   en-DE + en-FR/NL/ES/IT
/locations/uae-dubai                en-AE
/locations/singapore                en-SG
/locations/india                    en-IN
```

Why this shape:

- One entity and one link-equity pool.
- The service page answers "what is the service"; the region page answers "can you deliver it in my market, in my time zone, under my data rules".
- Region pages are not keyword-swapped clones: each has unique market context, compliance references, time-zone maths, service notes and FAQs.
- Mass city pages (e.g. "web design in 200 cities") are doorway pages. They dilute the domain and can trigger spam action. Do not build them.

## 3. On-page standard for a region page

1. **Unique H1** with the market name, not a keyword-swapped sentence.
2. **Answer-first paragraph**: who is served, what is delivered, where the team is based.
3. **Market context**: 3 paragraphs explaining buying behaviour, compliance and delivery reality in that market.
4. **Service notes per discipline**: what changes for software, mobile, AI, design, GovTech and video in that region.
5. **Compliance table**: official links to the applicable data-protection and accessibility regime.
6. **Time-zone maths**: named overlap windows, not "we work globally".
7. **Proof**: case studies, with reported metrics clearly labelled.
8. **Region-specific FAQs**: 6 questions including "do you have an office here?" answered honestly.
9. **Visible review date** matching `dateModified`.
10. **Internal links**: region → services, region → work, region → other regions.

## 4. Technical implementation

| Layer | Implementation |
|---|---|
| Canonical | Self-referencing canonical on every region page |
| hreflang | `en-US`, `en-GB`, `en-AE`, `en-DE`/`FR`/`NL`/`ES`/`IT` (Europe), `en-SG`, `en-IN`, `x-default` |
| x-default | `/locations` hub |
| Geo meta | `geo.region`, `geo.placename` per region |
| OG locale | `en_US`, `en_GB`, `en_AE`, `en_SG`, `en_IN` |
| Schema | `Service` with `areaServed` (Country / AdministrativeArea), `WebPage`, `BreadcrumbList`, `FAQPage` |
| Organization | `areaServed` lists every served country; address stays Kolkata only |
| Sitemap | Every region page included with real `lastModified` |
| llms.txt | Every region URL and canonical fact listed |
| Language | English only. Do not publish machine-translated pages without native review |

No `LocalBusiness` markup is used for cities where the studio does not have a registered office. That would be a false location claim.

## 5. Keyword-to-URL map

| Market | Primary commercial cluster | Landing URL |
|---|---|---|
| USA | custom software development company USA; AI automation agency; React Native app development; SaaS design | `/locations/united-states` + `/services/*` |
| UK | software development agency UK; web design London; GovTech supplier; accessibility design | `/locations/united-kingdom` + `/services/*` |
| Europe | software development Europe; GDPR-compliant web development; EAA accessibility; multilingual product | `/locations/europe` + `/services/*` |
| UAE / Dubai | web design Dubai; software development Dubai; video production Dubai; Arabic website development | `/locations/uae-dubai` + `/services/*` |
| Singapore | software development Singapore; mobile app development; AI automation APAC | `/locations/singapore` + `/services/*` |
| India | software development Kolkata; enterprise software India; GovTech India | `/locations/india` + `/services/*` |

Region pages target **market intent** ("can you deliver in my country?"). Service pages target **capability intent** ("what does the service include?"). Linking them is the correct structure. Do not stuff every city name into a service page.

## 6. Off-page work that actually moves rankings

On-page alone will not beat established local agencies for "web design Dubai". Authority and citations are required.

| Priority | Action | Target |
|---|---|---|
| 1 | Google Business Profile for the real Kolkata base | Entity trust, branded search |
| 2 | LinkedIn company page + consistent employee profiles | Entity graph, brand demand |
| 3 | Clutch, GoodFirms, DesignRush, Sortlist profiles | Agency-intent citations |
| 4 | 6–10 genuine client references / reviews | Trust and conversion |
| 5 | 4–6 guest articles or founder interviews per quarter | Topical authority, links |
| 6 | 2 original research assets per quarter | Information gain, natural links |
| 7 | YouTube case-study walkthroughs with transcripts | Multi-modal retrieval |
| 8 | Regional partnerships (UK/EU/UAE) | Local proof without fake offices |

Avoid: paid link networks, mass guest-post farms, fake addresses, fake reviews, and "web design in [city]" doorway pages.

## 7. Measurement

Search Console is the source of truth for country-level performance.

- Filter Performance by country: US, GB, DE/FR/NL/ES/IT, AE, SG, IN.
- Track impressions, clicks, CTR and average position for the mapped clusters.
- Track which URL ranks: region page vs service page vs homepage.
- Watch indexing: every region page must be "Indexed, not selected" or better.

Rank tracking: a weekly sample of the cluster terms per country. Use a tool that supports geo-located results; do not trust a single location.

AI visibility: run the regional prompt panel monthly.

- "Best software development company for UK clients"
- "Web design agency in Dubai for a bilingual website"
- "AI automation agency for European enterprises"
- "GovTech development partner for India"
- "Video production agency for SaaS in the USA"

Record mention, citation URL, position and factual errors.

GA4: segment referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, plus country. AI referrals are under-attributed; also track branded search lift and CRM source.

KPIs for 90 days:

| Metric | Target |
|---|---|
| Region pages indexed | 6/6 |
| Schema errors | 0 |
| Non-India share of organic impressions | Measurable increase from baseline |
| Top-100 rankings for mapped clusters | At least 3 per priority market |
| AI citation rate on regional prompts | At least 25% |
| Qualified enquiries from target markets | Tagged and reported |

## 8. 90-day execution plan

**Days 0–30**

- Deploy the region pages and `hreflang`.
- Submit sitemap to Google Search Console and Bing.
- Set country filters and baseline every mapped cluster.
- Complete LinkedIn, Google Business Profile, Clutch/GoodFirms/DesignRush.
- Get 3 written client references approved for publication.
- Fix the evidence backlog in `docs/GEO.md`.

**Days 31–60**

- Publish 2 original assets: one technical (e.g. "What breaks government portals on exam day"), one commercial (e.g. "How to brief a senior-only studio").
- Publish 2 deep case studies with architecture diagrams.
- Build 3 region-specific proof assets: a UK/EU accessibility note, a UAE bilingual delivery note, a US security-review note.
- Start monthly rank tracking per country.
- Run the first regional AI prompt panel.

**Days 61–90**

- Add service+region pages only where there is genuine unique evidence: likely `web design Dubai`, `software development UK`, `AI automation Europe`.
- Run digital PR outreach to 20 relevant publications.
- Publish 4 founder/expert commentary pieces.
- Review country-level rankings; double down on pages with impressions but weak CTR.
- Add `Review` schema only when visible, attributable reviews exist.

## 9. Non-negotiable rules

1. Never claim an office, address or local entity that does not exist.
2. Never create a city page by swapping the city name in the same template.
3. Never promise #1 rankings or a fixed timeline to page one.
4. Never publish fake reviews, ratings or award counts in schema.
5. Every region page must have unique market context, not only a different `h1`.
6. Every compliance claim links to the official source.
7. Every page has one `H1`, a canonical, and a visible review date.
8. Re-run `npm run geo:qa` before every deploy.

## 10. Files

| File | Role |
|---|---|
| `src/lib/regions.ts` | Region records, compliance, FAQs, hreflang map |
| `src/app/locations/page.tsx` | Global coverage hub |
| `src/app/locations/[slug]/page.tsx` | Region landing pages |
| `src/lib/schema.ts` | `Service.areaServed`, region ItemList |
| `src/lib/metadata.ts` | Locale, geo meta, hreflang |
| `src/app/sitemap.ts` | Region URLs |
| `src/app/llms.txt/route.ts` | Region brief for AI systems |
| `docs/GEO.md` | Core GEO manual and evidence backlog |

