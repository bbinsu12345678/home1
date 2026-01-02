/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const regions = require('../data/regions.json');
const keywords = require('../data/keywords.json');

function generatePermutations(arr) {
    if (arr.length <= 1) return [arr];
    const permutations = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPerms = generatePermutations(remaining);
        for (const p of remainingPerms) {
            permutations.push([current, ...p]);
        }
    }
    return permutations;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bananajeonju.netlify.app';
const currentDate = new Date().toISOString();

const urls = [];

// Base keywords (Top 3) same as pageData.ts
const baseKeywords = keywords.basic.slice(0, 3);
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

let idCounter = 1;

for (const region of regions) {
    for (const perm of perms) {
        for (const tail of tails) {
            // ID based URL
            urls.push({
                loc: `${siteUrl}/${idCounter}`,
                lastmod: currentDate,
                changefreq: 'daily',
                priority: '0.8'
            });
            idCounter++;
        }
    }
}

// XML Structure
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
}

xml += '</urlset>';

// Output paths
const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', 'out');

// Write to public
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log(`✅ Generated public/sitemap.xml with ${urls.length} URLs`);

// Write to out (if exists)
if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
    console.log(`✅ Generated out/sitemap.xml`);
}
