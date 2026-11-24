# लॉन्च चेकलिस्ट — जो कोड में हो चुका है, और जो आपको खुद करना है

## ✅ कोड में हो चुका (इस redesign में)

**डिज़ाइन / Frontend**
- पूरी साइट नए सिरे से — अख़बार/पत्रिका जैसा लेआउट, असली serif fonts (साइट पर ही host, Google Fonts पर निर्भर नहीं), कोई gradient/glow/icon सजावट नहीं।
- Shambhavaa का logo वही image (बिना बदलाव) — header, footer, favicon।
- मोबाइल-first: 390px फ़ोन पर कोई horizontal scroll नहीं, मोबाइल मेन्यू बिना JavaScript के।
- हर आर्टिकल: breadcrumb, लेखक, प्रकाशन/अपडेट तारीख, पढ़ने का समय, “In short” बॉक्स, Table of contents, FAQ, related articles, share links, author box।
- नए पेज: `/articles/` (सारे लेख), `/planets/`, `/search/`, असली 404 पेज।

**SEO**
- हर पेज पर unique title, meta description, canonical URL, Open Graph, Twitter card — 405 पेज पर automated जांच, 0 गलती।
- Structured data (schema.org): Organization, WebSite + SearchAction, Person (लेखक), BlogPosting, BreadcrumbList, FAQPage, Service, ItemList, DefinedTermSet (glossary)।
- `sitemap.xml` — हर आर्टिकल की असली `lastmod` तारीख के साथ (पहले हर build पर "आज" लिखा जाता था, जो Google को गलत संकेत था)।
- `robots.txt`, `feed.xml` (RSS), `manifest.webmanifest`, `llms.txt`।
- एक ही लेख वाले 293 पतले tag पेज `noindex` (Google "thin content" नहीं मानेगा); 2+ लेख वाले 10 tag पेज sitemap में।
- खाली section (Mercury, Nakshatra) `noindex` और मेन्यू से हटे, जब तक लेख न आएं।
- आर्टिकल के अंदर दूसरा H1 अपने-आप H2 बन जाता है (हर पेज पर ठीक एक H1)।
- Build से पहले content check: title/date/image गायब हो तो build रुक जाता है।

**Performance**
- होम पेज HTML 900 KB → 74 KB।
- 21 PNG फ़ोटो (2.5 MB तक) → WebP (30–240 KB)। कुल images 27 MB → 3 MB।
- Google Translate भाषा-popup, RankAI script, floating social bar, icon library हटाई।

**AdSense**
- `ads.txt` सही; AdSense script; `google-adsense-account` meta tag।
- Ad slots के लिए जगह तैयार (`src/config/site.js` में slot ID डालते ही दिखेंगे)।
- Policy पेज: Privacy (Google की ज़रूरी भाषा के साथ), Terms, Disclaimer, Contact, About, Editorial policy — सब footer में।

**Privacy / Security**
- Cookie banner + Google Consent Mode v2: सहमति से पहले analytics/ads cookies नहीं। Footer में "Cookie settings"।
- Content-Security-Policy, referrer policy; बाहरी लिंक `noopener`।
- Admin पेज `noindex`, robots में blocked; पुराना admin unpinned `decap-cms@^3` (किसी भी version को लोड कर सकता था) हटाकर pinned version।
- Repo से पुराना build कचरा (900 KB HTML फ़ाइलें, पुराना admin, पुराने images) हटाया।

**Booking (shambhavaa.com)**
- Header बटन, आर्टिकल के अंत में बॉक्स, sidebar, होम पेज band, services पेज, footer, tool पेज — सब shambhavaa.com पर, UTM tags के साथ।

---

## 🔲 आपको खुद करना है (क्रम से)

### 1. GitHub Pages सेटिंग (5 मिनट) — ज़रूरी
GitHub → repo → **Settings → Pages → Build and deployment → Source: "GitHub Actions"** चुनें।
अभी हर push पर दो deploy चल रहे हैं ("pages build and deployment" और हमारा workflow)। Source = GitHub Actions करने से सिर्फ़ सही वाला चलेगा। साथ ही **Enforce HTTPS** ✔ करें।

### 2. Google Search Console (15 मिनट)
1. search.google.com/search-console → **Add property → Domain** → `shambhavaa.blog` → DNS TXT record अपने domain provider पर जोड़ें।
2. **Sitemaps** → `https://shambhavaa.blog/sitemap.xml` submit करें।
3. **URL Inspection** में होम पेज और 3–4 मुख्य आर्टिकल डालकर **Request indexing**।
4. 1–2 हफ़्ते बाद **Pages** रिपोर्ट देखें — कौन से पेज index नहीं हुए और क्यों।

### 3. Bing Webmaster Tools (5 मिनट)
bing.com/webmasters → **Import from Google Search Console** (BingSiteAuth.xml पहले से है)। Sitemap submit करें।

### 4. AdSense
1. AdSense → **Sites** → `shambhavaa.blog` → "Ready" होने तक इंतज़ार।
2. **Privacy & messaging → European regulations** → message बनाएं और publish करें (EU/UK के visitors के लिए Google का certified consent banner ज़रूरी है)। फिर `src/config/site.js` में `useGoogleCmp: true` करें ताकि दो banner न दिखें।
3. **Ads → Auto ads** चालू करें, या ad units बनाकर slot IDs डालें (ADMIN-GUIDE §6)।
4. Approval से पहले कम से कम **25–30 अच्छे, मौलिक लेख** रखें (अभी 48 हैं ✔)।

### 5. Google Analytics
GA4 property `G-CCHG6BM3DL` पहले से लगी है। GA4 में **Admin → Data streams → shambhavaa.blog** चेक करें, और shambhavaa.com वाली property में **Referrals** रिपोर्ट से `utm_source=shambhavaa.blog` देखें।

### 6. सच्ची जानकारी भरें
- `src/config/site.js` → `AUTHOR.bio`: आपका असली अनुभव, कितने साल से practice, किससे सीखा। **सिर्फ़ सच** — झूठे दावे AdSense/Google दोनों में नुकसान करते हैं।
- About पेज पर आपकी असली फ़ोटो (`public/images/brand/arihant-saini.jpg`) — लेखक की असली फ़ोटो भरोसा बढ़ाती है। फ़ोटो डालने के बाद मुझे या किसी developer को बोलें, About पेज पर लगा देंगे।
- Contact में अगर business address/phone देना चाहें।

### 7. फ़ोटो बदलें
पुरानी AI-जैसी दिखने वाली फ़ोटो धीरे-धीरे असली फ़ोटो से बदलें (ADMIN-GUIDE §3 में सूची है)। वही फ़ाइल नाम रखें।

### 8. लंबे title छोटे करें
`npm run check` चलाने पर (या GitHub Actions log में) जिन लेखों का title 65 और summary 155 अक्षर से लंबा है, उनकी सूची आती है। Editor में **SEO title** फ़ील्ड में छोटा version डालें।

### 9. Newsletter
अभी sign-up ईमेल ऐप खोलता है। Beehiiv/Mailchimp/ConvertKit (मुफ़्त plan) पर account बनाएं, फिर `src/components/Newsletter.jsx` में उनका form action लगवाएं।
