# Cloudflare Worker Setup Guide

This guide will help you deploy a secure API proxy for your AI Concierge and PDF downloads.

## What This Does

- **Hides your Groq API key** - No one can steal it from your website
- **Rate limits requests** - 15 concierge requests/hour, 5 PDF downloads/day per IP
- **Protects against abuse** - Bots can't spam your API or downloads

---

## Step 1: Create the Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create Application** → **Create Worker**
4. Give it a name like `ama-api` (this becomes `ama-api.your-subdomain.workers.dev`)
5. Click **Deploy** (don't worry about the default code)

---

## Step 2: Add Your Code

1. After deploying, click **Edit Code**
2. Delete all the default code
3. Copy the entire contents of `cloudflare-worker.js` and paste it
4. Click **Save and Deploy**

---

## Step 3: Add Your API Key (Secure)

1. Go back to your Worker's overview page
2. Click **Settings** → **Variables**
3. Under **Environment Variables**, click **Add Variable**
4. Add these variables:

| Variable Name | Value | Encrypt? |
|--------------|-------|----------|
| `GROQ_API_KEY` | `your-groq-api-key-here` | ✅ Yes |
| `PDF_URL` | `https://abenteuer-mieten-amerika.de/Your_Route_Your_Way_v10.pdf` | No |

5. Click **Save and Deploy**

> **Important:** After adding the GROQ_API_KEY as an encrypted variable, delete it from your local files and never share it again!

---

## Step 4: Update Your Website

Open `index.html` and find this line (around line 4443):

```javascript
const CONCIERGE_API_URL = 'https://your-worker-name.your-subdomain.workers.dev/api/concierge';
```

Replace it with your actual Worker URL:

```javascript
const CONCIERGE_API_URL = 'https://ama-api.YOUR-SUBDOMAIN.workers.dev/api/concierge';
```

Your subdomain is shown in the Cloudflare Workers dashboard (e.g., `ama-api.johndoe.workers.dev`).

---

## Step 5: Test It

1. Open your website
2. Try the AI Concierge - it should work!
3. Check the browser console (F12) for any errors

### Test endpoints directly:

- **Health check:** `https://your-worker.workers.dev/api/health`
- **Concierge:** POST to `https://your-worker.workers.dev/api/concierge`
- **PDF:** `https://your-worker.workers.dev/api/guide`

---

## Step 6: Upload Your PDF

### Option A: Direct File (Simple)
1. Upload `Your_Route_Your_Way_v10.pdf` to your website folder
2. Make sure `PDF_URL` in Worker settings points to it

### Option B: Cloudflare R2 (Better for large files)
1. Go to **R2** in Cloudflare Dashboard
2. Create a bucket called `ama-assets`
3. Upload your PDF
4. Update the Worker code to use R2 (uncomment the R2 section in `handleGuideDownload`)

---

## Optional: Custom Domain

Instead of `ama-api.workers.dev`, use your own domain:

1. Go to Worker → **Settings** → **Triggers**
2. Click **Add Custom Domain**
3. Enter `api.abenteuer-mieten-amerika.de`
4. Update `CONCIERGE_API_URL` in your website to use this domain

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/concierge` | 15 requests | per hour |
| `/api/guide` | 5 downloads | per day |

Users who hit the limit see a friendly message in their language (DE/EN).

---

## Troubleshooting

### "CORS error" in browser console
- Make sure the Worker is deployed
- Check that `Access-Control-Allow-Origin` includes your domain

### "Our concierge is offline"
- Check the Worker logs: **Workers** → Your Worker → **Logs**
- Verify `GROQ_API_KEY` is set correctly in Variables

### PDF download not working
- Make sure `PDF_URL` points to a valid, publicly accessible file
- Check that the PDF file is uploaded to your server

---

## Security Checklist

- [ ] Groq API key removed from `index.html`
- [ ] Groq API key added as encrypted variable in Cloudflare
- [ ] Worker deployed and working
- [ ] `CONCIERGE_API_URL` updated in website
- [ ] Tested concierge from website
- [ ] Tested PDF download

---

## Cost

Cloudflare Workers free tier includes:
- **100,000 requests/day** - More than enough for most websites
- **10ms CPU time per request** - AI calls are fast

You won't pay anything unless you get massive traffic!
