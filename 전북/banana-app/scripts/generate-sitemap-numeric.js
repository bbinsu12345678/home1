/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const regions = require(path.join(__dirname, '../data/regions.json'));
const keywords = require(path.join(__dirname, '../data/keywords.json'));

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
const now = new Date();
const currentDate = now.toISOString();
const reservedPageIds = new Set([404, 500]);

// lastmod 차등화: 페이지 ID 기반으로 최근 7일 내 분산
function generateLastmod(pageId) {
    const seed = (pageId * 2654435761) >>> 0;
    const daysAgo = seed % 7;
    const hoursAgo = seed % 24;
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);
    return date.toISOString();
}

const urls = [];

// 정적 페이지
urls.push({ loc: `${siteUrl}/`, lastmod: currentDate, changefreq: 'daily', priority: '1.0' });
urls.push({ loc: `${siteUrl}/about/`, lastmod: currentDate, changefreq: 'monthly', priority: '0.7' });
urls.push({ loc: `${siteUrl}/gallery/`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' });

// 동적 페이지 (지역 x 키워드 조합)
const baseKeywords = keywords.basic.slice(0, 3);
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

let idCounter = 1;

for (const region of regions) {
    for (const perm of perms) {
        for (const tail of tails) {
            while (reservedPageIds.has(idCounter)) {
                idCounter++;
            }
            urls.push({
                loc: `${siteUrl}/${idCounter}/`,
                lastmod: generateLastmod(idCounter),
                changefreq: 'weekly',
                priority: '0.6'
            });
            idCounter++;
        }
    }
}

// 단일 sitemap.xml 생성
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

// 출력
const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', 'out');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log(`✅ public/sitemap.xml: ${urls.length}개 URL 생성`);

if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
    console.log(`✅ out/sitemap.xml 복사 완료`);
}
