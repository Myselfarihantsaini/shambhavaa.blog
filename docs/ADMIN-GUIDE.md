# Admin (एडमिन) गाइड — ब्राउज़र से आर्टिकल कैसे पोस्ट करें

Editor का पता: **https://shambhavaa.blog/admin/**

यह Sveltia CMS है। यह आपकी GitHub repository में सीधे Markdown फ़ाइल लिखता है। Save करते ही GitHub Actions साइट दोबारा build करता है और 2–3 मिनट में आर्टिकल लाइव हो जाता है।

---

## 1. पहली बार लॉगिन (एक बार का काम)

GitHub Pages पर कोई सर्वर नहीं है, इसलिए लॉगिन "Personal Access Token" से होता है।

1. GitHub खोलें → ऊपर दाईं ओर प्रोफ़ाइल फ़ोटो → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. भरें:
   - **Token name:** `shambhavaa-editor`
   - **Expiration:** 90 दिन (हर 3 महीने नया बनाएं — सुरक्षित रहता है)
   - **Repository access:** *Only select repositories* → `shambhavaa.blog` (सिर्फ़ यही एक!)
   - **Permissions → Repository permissions → Contents:** *Read and write* (बाकी कुछ नहीं)
3. **Generate token** → token कॉपी करें (यह दोबारा नहीं दिखेगा)।
4. `https://shambhavaa.blog/admin/` खोलें → **Sign in with Token** → token पेस्ट करें।

> सुरक्षा: token किसी को न भेजें, WhatsApp/ईमेल में न रखें। फ़ोन/लैपटॉप खो जाए तो GitHub में जाकर token को तुरंत **Delete** करें।

---

## 2. नया आर्टिकल लिखना

1. बाईं ओर सही section चुनें (जैसे *Saturn*, *House Lords*, *Horoscopes*)।
2. **New** दबाएं और फ़ील्ड भरें:

| फ़ील्ड | क्या लिखें |
| --- | --- |
| **Title** | 50–65 अक्षर। मुख्य search phrase पहले: “Saturn in 7th House: Marriage, Delay and Commitment” |
| **Publish date** | आज की तारीख |
| **Last updated** | सिर्फ़ तब, जब बाद में सच में कंटेंट बदला हो |
| **Summary** | 120–155 अक्षर। यही Google में दिखता है। |
| **Featured** | होम पेज पर बड़ा दिखाना हो तो ✔ (cover image होनी चाहिए) |
| **Cover image** | नीचे “फ़ोटो के नियम” पढ़ें |
| **Alt text** | फ़ोटो में क्या है, साफ़ शब्दों में |
| **Image credit** | फ़ोटो किसकी है (NASA, आपका नाम, आदि) |
| **Search phrases** | 3–6 phrases जो लोग सच में Google करते हैं |
| **In short** | 2–3 वाक्य जो title के सवाल का सीधा जवाब दें |
| **Key points** | 3–5 छोटे बिंदु |
| **FAQs** | 3–6 असली सवाल-जवाब |
| **Draft** | ✔ = अभी publish नहीं होगा |
| **Article** | मुख्य लेख (संरचना के लिए `CONTENT-GUIDE.md` देखें) |

3. **Save** दबाएं। 2–3 मिनट बाद आर्टिकल `https://shambhavaa.blog/<section>/<slug>/` पर होगा।
4. GitHub → **Actions** टैब में हरा ✔ दिखे तो सब ठीक है। लाल ✘ दिखे तो क्लिक करके पढ़ें — ज़्यादातर गलती title/date खाली होना या image का गलत पता होती है।

**URL (slug):** title से अपने-आप बनता है। Publish के बाद slug न बदलें — पुराना लिंक टूट जाएगा।

---

## 3. फ़ोटो के नियम (बहुत ज़रूरी)

- ✅ **असली फ़ोटोग्राफ़** — NASA/ESA की ग्रहों की फ़ोटो (public domain), मंदिर, पंचांग, हाथ से बनी कुंडली, किताबें, आपकी अपनी खींची फ़ोटो।
- ✅ **landscape**, कम से कम **1200×675 px**, **WebP या JPG**, **600 KB से कम** (editor अपने-आप WebP में बदलकर 1600px कर देता है)।
- ❌ **vector / line-art / icon वाली तस्वीरें नहीं।**
- ❌ **फ़ोटो के ऊपर लिखा हुआ टेक्स्ट नहीं** — Google उसे पढ़ नहीं सकता, और मोबाइल पर छोटा दिखता है।
- ❌ **AI-generated fantasy art** (चमकते ग्रह, बैंगनी धुआँ, देवताओं की glowing तस्वीरें) — ये तुरंत "AI" लगती हैं और भरोसा घटाती हैं।
- ❌ Google Images / Pinterest से उठाई फ़ोटो — copyright की समस्या, AdSense रिजेक्ट हो सकता है।

**मुफ़्त और सुरक्षित स्रोत:**
- NASA Image Library — images.nasa.gov (credit: “NASA/JPL-Caltech” जैसा लिखें)
- Wikimedia Commons — commons.wikimedia.org (हर फ़ोटो का license पढ़ें, credit दें)
- Unsplash / Pexels — मुफ़्त, credit देना अच्छा है

**पुरानी फ़ोटो जिन्हें बदलना चाहिए:** `public/images/saturn/*`, `rahu/*`, `moon/*`, `sun/*`, `ketu/*`, `horoscopes/*`, `lifestyle/*` — ये AI-generated दिखती हैं और कई पर टेक्स्ट लिखा है। धीरे-धीरे इन्हें असली फ़ोटो से बदलें (वही फ़ाइल नाम रखें तो आर्टिकल में कुछ बदलना नहीं पड़ेगा)।

---

## 4. पुराना आर्टिकल अपडेट करना

1. Editor में आर्टिकल खोलें → बदलाव करें।
2. अगर बदलाव बड़ा है (नई जानकारी, नए section) तो **Last updated** में आज की तारीख डालें। Google को यह "fresh" संकेत देता है।
3. Save।

## 5. Consultation (booking) लिंक बदलना

`src/config/site.js` में `BOOKING.url` बदलें — पूरी साइट के सारे बटन अपने-आप बदल जाएंगे। सभी लिंक में `utm_source=shambhavaa.blog` लगा है, ताकि shambhavaa.com के Analytics में दिखे कि कितने लोग blog से booking पर आए।

## 6. AdSense ad units लगाना

AdSense → **Ads → By ad unit** → *Display ads* बनाएं → उसका `data-ad-slot` नंबर कॉपी करें → `src/config/site.js` में `ADSENSE.slots` में डालें:

- `articleTop` — आर्टिकल की शुरुआत में
- `articleEnd` — आर्टिकल के अंत में
- `sidebar` — डेस्कटॉप साइडबार
- `listing` — होम और section पेज पर

खाली छोड़ेंगे तो वह ad नहीं दिखेगा (Auto ads फिर भी चलते रहेंगे)।
