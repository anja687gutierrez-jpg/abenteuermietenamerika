# Abenteuer Mieten Amerika - Site Reference
Last updated: January 20, 2026

## IMPORTANT: Domain & Email

| Item | Value |
|------|-------|
| **Domain** | `abenteuermietenamerika.de` |
| **Website URL** | https://abenteuermietenamerika.de |
| **Email** | info@goiconicway.com |
| **Hosting** | Cloudflare (manual upload) |
| **Git Repository** | https://github.com/engel687-ui/abenteuermietenamerika.git |

**SPELLING NOTE:** The domain is `abenteuer` + `mieten` + `amerika` (with 'e' in mieten)

---

## Business Information

| Item | Value |
|------|-------|
| **Parent Company** | Gutierrez Ventures LLC |
| **DBA** | Abenteuer Mieten Amerika (in Gründung) |
| **Service** | Booking & Concierge Services for German travelers in America |
| **Address** | 6445 S Tenaya Way, Suite 110, Las Vegas, NV 89113, USA |
| **Phone** | +1 (323) 917-7708 |

---

## Email Setup

- **Provider:** GoDaddy (forwarding only)
- **Email:** info@goiconicway.com
- **Forwards to:** anja687gutierrez@gmail.com
- **Cost:** FREE (included with domain registration)

Note: Gmail "Send As" requires paid SMTP service. Currently using forwarding only.

---

## Analytics

| Service | ID | Status |
|---------|-----|--------|
| **Google Analytics 4** | G-7LCWYNKB6M | Active |
| **Google Ads** | AW-XXXXXXXXXX | Not configured |
| **Meta Pixel** | XXXXXXXXXXXXXXXX | Not configured |
| **Microsoft Clarity** | XXXXXXXXXX | Not configured |

See `ANALYTICS_SETUP_GUIDE.md` for setup instructions.

---

## File Structure

```
LIVE/
├── index.html              ← Main website (single page)
├── images-config.js        ← Image configuration (easy updates)
├── tesla.mp4               ← Hero video
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← Search engine instructions
├── flaviconicon.png        ← Favicon
├── *.jpg                   ← All website images
├── *.kml                   ← Route download files
│
├── SITE-REFERENCE.md       ← THIS FILE
├── HOW-TO-UPDATE-IMAGES.md ← Image update guide
├── ANALYTICS_SETUP_GUIDE.md← Analytics setup guide
├── CLOUDFLARE-WORKER-SETUP.md
│
└── _archive/               ← Old versions (backup)
```

---

## KML Route Files

These files are downloadable from the Routes section:

| File | Route |
|------|-------|
| `Las_Vegas_Tour_-_7_Tage.kml` | Grand Circle / Las Vegas Tour |
| `Route_66_-_Part_1.kml` | Route 66 Part 1 |
| `Copy_of_Route_66_-_Part_2.kml` | Route 66 Part 2 |

Source location: `/Business/Apps/PDF Guide/Routes/`

---

## Forms

All lead capture forms submit to Google Sheets via Apps Script:
- Hero form
- Popup form (exit intent)
- Sticky bar form

Endpoint: `https://script.google.com/macros/s/AKfycbzF4t-juXYphl5JjFjzurt9ARcaYnyOHYo4vCVUgmb99l96p-seSdcQJTZKaP5d92icyg/exec`

---

## Legal Pages (Modals in index.html)

- **AGB & Mietbedingungen** - 11 sections including:
  - Section 1: Vermittlungsplattform (Booking Platform)
  - Section 8: Concierge-Service
  - Section 9: Klausy App - KI-Routenplaner
  - Section 10: Allgemeine Reiserisiken
  - Section 11: Haftungsbeschränkung
- **Datenschutz** - Privacy policy (GDPR compliant)
- **Impressum** - Legal imprint
- **Cookie Settings** - Cookie consent management

---

## Deployment Checklist

When uploading to Cloudflare:

- [ ] index.html
- [ ] images-config.js
- [ ] tesla.mp4
- [ ] All .jpg images
- [ ] All .kml files
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] flaviconicon.png

---

## Quick Reference Guides

| Task | Guide |
|------|-------|
| Update images | `HOW-TO-UPDATE-IMAGES.md` |
| Set up analytics | `ANALYTICS_SETUP_GUIDE.md` |
| Cloudflare worker | `CLOUDFLARE-WORKER-SETUP.md` |

---

## DBA Documentation

Full business documentation at:
`/Users/anjacarrillo/Documents/DBA/Abenteuer Mieten Amerika/`

Includes checklists for:
- Licenses & Permits
- Legal Documents
- Insurance
- Payments & Taxes
- Contracts & Agreements
- Marketing
