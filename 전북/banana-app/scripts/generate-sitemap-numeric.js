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
const currentDate = new Date().toISOString();

// ===== URL 목록 생성 =====
const urls = [];

// 홈페이지
urls.push({
    loc: `${siteUrl}/`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0'
});

// 서브페이지 (지역 × 키워드순열 × 꼬리)
const baseKeywords = keywords.basic.slice(0, 3);
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

let idCounter = 1;
for (const region of regions) {
    for (const perm of perms) {
        for (const tail of tails) {
            urls.push({
                loc: `${siteUrl}/${idCounter}/`,
                lastmod: currentDate,
                changefreq: 'daily',
                priority: '0.8'
            });
            idCounter++;
        }
    }
}

console.log(`📊 총 URL 수: ${urls.length}`);

// ===== 사이트맵 생성 (단일 파일) =====
function generateSitemapXml(urlList) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (const url of urlList) {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
    }
    xml += '</urlset>';
    return xml;
}

// ===== 파일 출력 =====
const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', 'out');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const sitemapXml = generateSitemapXml(urls);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
console.log(`✅ Generated public/sitemap.xml (${urls.length} URLs)`);

// 3) out 폴더에도 복사 (빌드 출력)
if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml);
    console.log(`✅ Generated out/sitemap.xml`);
}

console.log(`\n🎯 완료! 단일 sitemap.xml 생성됨`);
