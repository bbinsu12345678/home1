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

const siteUrl = 'https://bananajeonju.netlify.app';
const currentDate = new Date().toISOString();

let urls = [];

// 홈페이지
urls.push({
    loc: siteUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0'
});

// 동적 페이지들
const targetRegions = regions;
const baseKeywords = keywords.basic.slice(0, 3); // 변기, 싱크대, 하수구
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail || ["10곳 비교"];

for (const region of targetRegions) {
    for (const perm of perms) {
        for (const tail of tails) {
            const keywordStr = `${perm.join("")} ${tail}`;
            const urlPath = [
                encodeURIComponent(region.sido),
                encodeURIComponent(region.si),
                encodeURIComponent(region.gugun),
                encodeURIComponent(region.dong),
                encodeURIComponent(keywordStr)
            ].join('/');

            urls.push({
                loc: `${siteUrl}/${urlPath}`,
                lastmod: currentDate,
                changefreq: 'weekly',
                priority: '0.8'
            });
        }
    }
}

// XML 생성
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
}

xml += '</urlset>';

// public 폴더에 sitemap.xml 생성
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);

// out 폴더에도 sitemap.xml 복사 (static export를 위해)
const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
}

console.log(`✅ Sitemap generated successfully with ${urls.length} URLs`);
console.log(`   - public/sitemap.xml`);
if (fs.existsSync(outDir)) {
    console.log(`   - out/sitemap.xml`);
}
