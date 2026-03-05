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

// ===== 사이트맵 분할 (1,000개 단위) =====
const URLS_PER_SITEMAP = 1000;
const sitemapChunks = [];

for (let i = 0; i < urls.length; i += URLS_PER_SITEMAP) {
    sitemapChunks.push(urls.slice(i, i + URLS_PER_SITEMAP));
}

console.log(`📂 사이트맵 분할: ${sitemapChunks.length}개 파일`);

// ===== 개별 sitemap 파일 생성 =====
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

// ===== sitemapindex 생성 =====
function generateSitemapIndex(chunkCount) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    for (let i = 1; i <= chunkCount; i++) {
        xml += '  <sitemap>\n';
        xml += `    <loc>${siteUrl}/sitemap-${i}.xml</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += '  </sitemap>\n';
    }
    xml += '</sitemapindex>';
    return xml;
}

// ===== 파일 출력 =====
const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', 'out');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// 1) sitemapindex → sitemap.xml
const sitemapIndexXml = generateSitemapIndex(sitemapChunks.length);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml);
console.log(`✅ Generated public/sitemap.xml (sitemapindex, ${sitemapChunks.length} sitemaps)`);

// 2) 개별 sitemap-N.xml
for (let i = 0; i < sitemapChunks.length; i++) {
    const filename = `sitemap-${i + 1}.xml`;
    const xml = generateSitemapXml(sitemapChunks[i]);
    fs.writeFileSync(path.join(publicDir, filename), xml);
    console.log(`✅ Generated public/${filename} (${sitemapChunks[i].length} URLs)`);
}

// 3) out 폴더에도 복사 (빌드 출력)
if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapIndexXml);
    for (let i = 0; i < sitemapChunks.length; i++) {
        const filename = `sitemap-${i + 1}.xml`;
        const xml = generateSitemapXml(sitemapChunks[i]);
        fs.writeFileSync(path.join(outDir, filename), xml);
    }
    console.log(`✅ Generated out/ sitemaps`);
}

console.log(`\n🎯 완료! sitemap.xml(index) + sitemap-1.xml ~ sitemap-${sitemapChunks.length}.xml`);
