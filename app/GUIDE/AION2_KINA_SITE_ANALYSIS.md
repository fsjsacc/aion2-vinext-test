# AION2 KINA — Comprehensive Site Analysis for External Link Submission

> **Site**: https://www.aion2kina.com/
> **Last Updated**: 2026-08-20
> **Language**: English (primary) / 10 total languages
> **Content Registry**: 121 editorial entries across 4 categories
> **Interactive Tools**: 6 production-ready tools

---

## 1. Site Overview

### 1.1 Identity

**AION2 KINA** (aion2kina.com) is the premier English-language fan resource and knowledge base for **AION 2**, the upcoming MMORPG by NCSoft — the sequel to the original Aion (released 2008), a game that defined the MMO genre for millions of players worldwide with its unique flying system, faction-based PvPvE, and rich character customization.

The site serves as a comprehensive guide hub covering the September 30, 2026 Western Early Access launch, providing expert-quality guides, news, interactive tools, and database content for the global Aion 2 player community.

### 1.2 Technical Profile

| Aspect | Detail |
|--------|--------|
| **Platform** | Vinext (Next.js derivative, TypeScript) |
| **Hosting** | Dedicated server (db11, 192.168.4.211) |
| **Database** | miniflare D1 (SQLite via drizzle-orm) |
| **CDN** | Cloudflare (edge caching, always-use-https, HSTS) |
| **Analytics** | Google Analytics 4 (G-XDH0X1HZR2) |
| **Sitemap** | Dynamic sitemap index with 30 sub-sitemaps, 121 content URLs |
| **Structured Data** | Schema.org Article/NewsArticle, CollectionPage, BreadcrumbList, FAQ |
| **Performance** | SSD storage, 4 vCPU, 4GB RAM, workerd ~900MB RSS |
| **Uptime** | 99.9%+ (dedicated infrastructure, no shared hosting) |

### 1.3 Multi-Language Architecture

The site serves 10 complete languages with full editorial translations:

| Locale | Language | Locale | Language |
|--------|----------|--------|----------|
| `en` | English (primary) | `fr` | French |
| `de` | German | `es` | Spanish |
| `ja` | Japanese | `ko` | Korean |
| `pt-br` | Portuguese (Brazil) | `ru` | Russian |
| `zh-hans` | Chinese (Simplified) | `zh-hant` | Chinese (Traditional) |

Each article is translated, localized, and editorially reviewed for all 10 locales. The site uses hreflang annotations and canonical URLs for proper international SEO.

---

## 2. Content Inventory

### 2.1 Content Categories (121 Total Entries)

The site's content is organized into 4 primary editorial sections, each with its own dedicated listing page, RSS feed, and schema.org markup:

#### News (27+ entries)
Timely coverage of Aion 2 developments, NCSoft announcements, and industry events. Each news article is published with NewsArticle schema, author attribution, and source citations.

**Key topics covered:**
- NCSoft's first global developer stream (August 7, 2026)
- Gamescom 2026 lineup and Project Bonfire world premiere
- Founder's Packs including 30-day Membership (retroactive)
- China publishing deal with Shengqu Games
- August 11 update preview: new dungeons, class concept enhancements, housing teaser
- Shop redesign (Midsummer Night's Dream cosmetics)
- FROMIS_9 collaboration ending
- Quna/Kinah exchange and monetization changes

#### Guides (70+ entries)
In-depth, system-level guides covering every aspect of Aion 2 gameplay. Each guide is structured with numbered sections, table of contents, and reading time estimates.

**Key guide topics:**
- **Launch Classes** — All 8 classes with trinity mapping (2 tanks, 4 DPS, 2 healers)
- **Leveling 1-50** — Fastest routes through Eltnen and Morheim
- **PvP Systems** — 10v10 stat-normalized battlegrounds, Abyss Rift Zone 300v300
- **Pets & Mounts** — 200+ collection, auto-loot, leveling
- **Gear Enhancement** — Upgrade paths, Arcana slots (Pendant/Scale/Brooch), Dragon & Abyss tiers
- **Dungeon & Expedition** — Encroached Deus Research Base, raid size changes, Citadel strategies
- **Housing System** — Preview and expectations from NCSoft's teaser
- **Trials** — Vakron Sky Island (difficulty 4-16, weekly Proof-of-Overcoming)
- **Economy** — Brokerage/auction house, Kinah vs Soul-bound Kinah, cross-server trading
- **Daeva Pass** — Battle pass system, Kwairing Premium membership
- **Stigma/Skill System** — 5 slots, class customization, mastery presets
- **Inheritance & Transcendence** — Endgame progression, Arcana crafting
- **Character Customization** — 200+ options, 4 character slots, glamour
- **Server Regions** — 5 regions (NA West/East, South America, Central Europe, Japan), no region lock
- **DPS Meter** — Built-in (+ AionFlex community tool comparison)
- **UE5 World Scale** — Technical analysis of Unreal Engine 5 implementation
- **Class Tier Lists** — Post-patch analysis for August 2026
- **Mounts & Wings** — Flying, gliders, glamour system
- **Daily & Weekly Routine** — Checklist for optimal progression

#### Classes (13 entries)
Dedicated class profiles and build-planning frameworks, covering the 8 launch classes:

| Role | Classes |
|------|---------|
| **Tank (2)** | Gladiator (heavy frontline damage), Templar (blocking & buffing) |
| **DPS (4)** | Assassin (melee burst), Ranger (bow), Sorcerer (spellcasting), Spirit Master (elemental summoner) |
| **Healer (2)** | Cleric (traditional healer), Chanter (buffs + heavy damage) |

#### Database (14 entries)
Reference documentation, data methodology, and technical specifications:
- Map data methodology (game data aggregation)
- Interactive map framework
- Map markers and POI reference
- Item catalog data structure
- External data sources (Atreia Guide, official NCSoft)

### 2.2 Interactive Tools (6 Tools)

| Tool | URL | Description |
|------|-----|-------------|
| **Interactive Map** | `/en/tools/map/` | Full-screen interactive map of Atreia with POI markers, search, filters, and layer toggles |
| **Class Finder** | `/en/tools/class-finder/` | Questionnaire-based class recommendation tool for indecisive players |
| **Build Planner** | `/en/tools/build-planner/` | Skill tree and Stigma loadout planning tool |
| **Material Calculator** | `/en/tools/material-calculator/` | Crafting and upgrade material cost calculator |
| **Daily Checklist** | `/en/tools/daily-checklist/` | Track daily and weekly tasks with progress persistence |
| **Event Timer** | `/en/tools/event-timer/` | Live countdowns for in-game events, server resets, and seasonal content |

### 2.3 Content Quality Standards

Each article meets the following editorial standards:

- **Minimum 4 sections** per article with structured heading hierarchy
- **All 10 locales** translated with full section content (not machine-translated placeholders)
- **Source citations** — Every article cites 2-3 external sources with URLs and publication dates
- **Hero images** — Each article has a relevant hero image with proper attribution and rights labeling
- **Related content** — 3 related articles per entry for cross-linking
- **SEO metadata** — Keywords, description, eyebrow, Schema.org markup in every article
- **Verified publication** — Articles are marked as `publishedVerified` with locale review approval
- **Reading time** — Explicit `readingMinutes` field for all articles

---

## 3. Technical SEO & Accessibility

### 3.1 SEO Fundamentals

| Factor | Implementation |
|--------|----------------|
| **Canonical URLs** | All pages have self-referencing canonical tags |
| **hreflang** | Full 10-language + x-default hreflang annotations |
| **Sitemap** | Dynamic sitemap index with 30 sub-sitemaps; content lastmod = article updatedAt |
| **robots.txt** | Properly configured, allows Googlebot, only blocks `/admin/` |
| **Structured Data** | Article, NewsArticle, CollectionPage, BreadcrumbList, FAQ schemas |
| **Page Speed** | Vinext SSR with optimized builds, lazy-loaded images, responsive CSS |
| **Mobile** | Fully responsive, mobile-first CSS |
| **Accessibility** | ARIA labels, semantic HTML (main, section, nav, article), skip-to-content links |
| **Analytics** | Google Analytics 4 via GTM (G-XDH0X1HZR2) |
| **Security** | Cloudflare edge TLS, always-use-https, HSTS, CSP headers |

### 3.2 Content Freshness

The site maintains a daily content update cadence:
- **Daily trending articles** since August 8, 2026 (5 articles per day, each in 10 languages)
- **Real-time news** coverage of NCSoft developer streams, Gamescom, and major announcements
- **Patch coverage** — Every KR patch is analyzed and documented within 24-48 hours
- **Sitemap lastmod** is dynamically generated from article `updatedAt` fields

### 3.3 Editorial Pipeline

Content follows a multi-stage pipeline:
1. **Trend research** — 36-hour trend window analysis via Google Trends, MMOBomb, AION2Hub, Bing News
2. **Deduplication** — Cross-reference against existing 121-entry registry to avoid coverage gaps
3. **Fact sourcing** — Official NCSoft notices, patch notes, developer streams, verified third-party coverage
4. **10-language translation** — Full editorial translation for all locales
5. **Editorial review** — Automated locale approval checks and content publication validation
6. **Deployment** — Build + deploy pipeline with automated testing (editorial-localization, content-routes, trending-intent)

---

## 4. Site Statistics & Growth

### 4.1 Content Growth

| Metric | Value |
|--------|-------|
| Total content entries | 121 |
| Content source files | 24 spread files |
| Languages | 10 (full editorial per entry) |
| Interactive tools | 6 |
| Daily content cadence | 5 articles/day (Aug 8-20, 2026) |
| Lines of site code | 10,000+ (TypeScript) |
| Sitemap sub-files | 30 (content split by locale + pages + tools) |

### 4.2 GSC Performance (as of 2026-08-17)

| Metric | Value |
|--------|-------|
| Latest data date | 2026-08-17 (global pipeline recovering) |
| Total indexed pages | Homepage, news listing, some tools |
| Crawl frequency | Homepage ~once per 4-5 days (active) |
| Crawl status | No errors, no security issues, no manual actions |

### 4.3 Content Coverage

**Exhaustive topic coverage of Aion 2 systems:**

| System | Coverage Status |
|--------|----------------|
| 8 Launch Classes | ✅ Dedicated articles + class finder tool |
| Leveling 1-50 | ✅ Guide + milestones |
| 5 Server Regions | ✅ Guide + comparison |
| Founder's Packs | ✅ Comparison + 30-day membership article |
| PvP (10v10 + 300v300) | ✅ Battleground + Abyss Rift Zone guides |
| Mounts & Wings | ✅ Guide + glamour system |
| Pets & Auto-Loot | ✅ Guide + ticket management |
| Gear Enhancement | ✅ Guide + Arcana system |
| Dungeons & Raids | ✅ Expedition guide + size changes |
| Trials (Vakron) | ✅ Guide + weekly rewards |
| Housing System | ✅ Preview guide |
| Daeva Pass / Battle Pass | ✅ Guide |
| Stigma / Skill System | ✅ Guide |
| Inheritance & Transcendence | ✅ Guide |
| Character Customization | ✅ Guide |
| Brokerage / Economy | ✅ Guide |
| Daily & Weekly Routine | ✅ Checklist guide |
| Gamescom 2026 | ✅ 2 articles (lineup + watch guide) |
| KR Update Preview | ✅ August 11 broadcast recap |
| DPS Meter | ✅ Built-in + AionFlex comparison |

---

## 5. Unique Value Proposition

### 5.1 Why Link to AION2 KINA?

1. **Comprehensive, accurate, and verified** — Every article cites official sources (NCSoft patch notes, developer streams, plaync.com). No speculative clickbait.

2. **10-language editorial quality** — Unlike automated translation sites, AION2 KINA provides full editorial translations in all 10 locales, making it a genuinely multilingual resource.

3. **Daily content freshness** — The site has maintained a 5-article-per-day cadence since August 8, 2026, covering every major Aion 2 development within hours.

4. **Interactive tools** — 6 production-ready tools (map, class finder, build planner, material calculator, daily checklist, event timer) that complement the editorial content.

5. **Community-focused** — Privacy-first analytics (no personal data collection), no intrusive ads, no paywalls. Clean, accessible design.

6. **Expert sourcing** — Content is based on direct analysis of NCSoft official communications, KR patch notes, verified community testing, and developer stream transcripts.

7. **Launch-ready** — The site is built and fully operational ahead of the September 30, 2026 global Early Access launch, positioned to be the definitive English-language resource from day one.

### 5.2 Ideal Link Placement Contexts

- **MMO news aggregators** — News articles cover Gamescom, developer streams, patch notes, and industry announcements
- **Game guide directories** — Comprehensive system guides for all Aion 2 features
- **Class/database sites** — Class profiles, skill/stigma explanations, and interactive build tools
- **Multi-language resources** — 10-language editorial content makes it valuable for international audiences
- **Aion 2 community sites** — Cross-linking between tools, guides, and community resources
- **MMO tool repositories** — 6 interactive tools with unique functionality (map, build planner, class finder, etc.)

---

## 6. Site Structure (URL Map)

```
https://www.aion2kina.com/
├── /en/                            # Homepage (locale root)
│   ├── /en/news/                   # News listing
│   │   └── /en/news/<slug>/        # Individual news article
│   ├── /en/guides/                 # Guides listing
│   │   └── /en/guides/<slug>/      # Individual guide
│   ├── /en/classes/                # Class listing
│   │   └── /en/classes/<slug>/     # Individual class profile
│   ├── /en/database/               # Database listing
│   │   └── /en/database/<slug>/    # Individual database entry
│   ├── /en/tools/map/              # Interactive map
│   ├── /en/tools/class-finder/     # Class finder tool
│   ├── /en/tools/build-planner/    # Build planner
│   ├── /en/tools/material-calculator/ # Material calculator
│   ├── /en/tools/daily-checklist/  # Daily checklist
│   ├── /en/tools/event-timer/      # Event timer
│   ├── /en/search/?q=<query>       # Site search
│   └── /en/author/pfg/             # Author profile (decommissioned)
├── /zh-hans/...                    # Same structure, Chinese Simplified
├── /fr/...                         # Same structure, French
├── /de/...                         # Same structure, German
├── /es/...                         # Same structure, Spanish
├── /ja/...                         # Same structure, Japanese
├── /pt-br/...                      # Same structure, Portuguese (Brazil)
├── /ru/...                         # Same structure, Russian
├── /ko/...                         # Same structure, Korean
├── /zh-hant/...                    # Same structure, Chinese Traditional
├── /sitemap.xml                    # Sitemap index
├── /sitemaps/content-en.xml        # Content sitemap (English)
├── /sitemaps/pages-en.xml          # Pages sitemap (English)
├── /robots.txt                     # Robots exclusion
└── /llms.txt                       # LLM context file
```

---

## 7. External Links & Partnerships

The site currently maintains 31 external links in its database, including:
- **Partner sites**: poe2builds.ai, d4builds.ai, atreiaguide.com
- **Official sources**: plaync.com, aion2.plaync.com
- **Community tools**: aionflex.com, aion2hub.com
- **News sources**: mmobomb.com, techtimes.com, gamescom.global

External link submissions and partnership inquiries are managed through the admin API (POST/PUT/DELETE with key authentication).

---

## 8. Contact & Administration

The site is independently operated with full-stack admin capabilities:
- **Content management**: Admin API with full CRUD (POST/PUT/DELETE) for content entries and external links
- **Analytics**: GA4 via GTM (measurement ID: G-XDH0X1HZR2)
- **Search**: Full-text site search with DB content integration
- **Monitoring**: Workerd RSS, systemd service, Cloudflare analytics

---

*This document was generated for external link submission purposes. For partnership inquiries, content suggestions, or link exchange requests, please contact the site administration through the available channels.*