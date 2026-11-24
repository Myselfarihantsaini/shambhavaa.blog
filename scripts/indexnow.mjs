// Tells Bing, Yandex and other IndexNow search engines about every URL in the sitemap.
// Runs in GitHub Actions after a deploy. The key file lives at /bc2823697ec3065e9600e69a8ef59a20.txt (public by design).
import fs from 'fs';

const KEY = 'bc2823697ec3065e9600e69a8ef59a20';
const HOST = 'shambhavaa.blog';
const xml = fs.readFileSync('out/sitemap.xml', 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status}`);
// 200/202 = accepted. Never fail the deploy because of this step.
