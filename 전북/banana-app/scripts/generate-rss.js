/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const regions = require(path.join(__dirname, '../data/regions.json'));
const keywords = require(path.join(__dirname, '../data/keywords.json'));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bananajeonju.netlify.app';
const siteName = '바나나배관';
const siteDescription = '전북 전남 광주 배관막힘, 변기막힘, 싱크대막힘, 하수구막힘, 에어컨배관청소, 정화조막힘 전문 24시간 긴급출동';
const now = new Date();

function generatePermutations(arr) {
    if (arr.length <= 1) return [arr];
    const permutations = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        for (const p of generatePermutations(remaining)) {
            permutations.push([current, ...p]);
        }
    }
    return permutations;
}

function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// RSS에는 최근 50개 항목만 포함 (네이버 권장)
const RSS_ITEM_LIMIT = 50;
const baseKeywords = keywords.basic.slice(0, 3);
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ['10곳 비교'];
const reservedPageIds = new Set([404, 500]);

const items = [];

// 정적 페이지
items.push({
    title: `전북 전남 광주 배관막힘 24시간 상담 안내`,
    link: `${siteUrl}/`,
    description: `전북 전남 광주 지역의 배관막힘, 하수구막힘, 변기막힘, 싱크대막힘, 에어컨배관청소, 정화조막힘 전문 상담 정보`,
    pubDate: now.toUTCString(),
});
items.push({
    title: `바나나배관 소개 | 전북·전남·광주 배관막힘 전문`,
    link: `${siteUrl}/about/`,
    description: `바나나배관은 전북, 전남, 광주 지역에서 배관막힘 해결 전문 서비스를 제공합니다.`,
    pubDate: now.toUTCString(),
});
items.push({
    title: `전체 서비스 지역 목록 | 바나나배관`,
    link: `${siteUrl}/gallery/`,
    description: `전북 전남 광주 전 지역 배관막힘, 에어컨배관청소, 정화조막힘 서비스 지역 안내`,
    pubDate: now.toUTCString(),
});

// 동적 페이지 (지역별로 골고루 선택)
let idCounter = 1;
let dynamicCount = 0;

for (const region of regions) {
    if (dynamicCount >= RSS_ITEM_LIMIT - 3) break;

    // 각 지역에서 첫 번째 키워드 조합만 사용
    const perm = perms[0];
    const tail = tails[0];

    while (reservedPageIds.has(idCounter)) idCounter++;

    const regionName = [region.sido, region.si, region.gugun, region.dong]
        .filter(Boolean).join(' ');
    const keywordStr = `${perm.join('')} ${tail}`;

    const daysAgo = dynamicCount % 7;
    const itemDate = new Date(now);
    itemDate.setDate(itemDate.getDate() - daysAgo);

    items.push({
        title: `${regionName} ${keywordStr} 해결 가이드`,
        link: `${siteUrl}/${idCounter}/`,
        description: `${regionName} 지역 ${keywordStr} 문제를 빠르게 점검하고 해결 방향을 안내합니다.`,
        pubDate: itemDate.toUTCString(),
    });

    // 다음 지역으로 건너뛰기 (perms * tails 만큼 skip)
    idCounter += perms.length * tails.length;
    dynamicCount++;
}

// 그룹2: 에어컨배관/정화조 단독 키워드 (지역별 1개씩)
const soloKeywords = ['에어컨배관막힘', '정화조막힘'];
const soloStartId = 1 + regions.length * perms.length * tails.length;
let soloId = soloStartId;

for (const soloKw of soloKeywords) {
    if (dynamicCount >= RSS_ITEM_LIMIT + 10) break;
    // 대표 5개 지역만 RSS에 포함
    const sampleRegions = regions.filter((_, i) => i % Math.ceil(regions.length / 5) === 0).slice(0, 5);
    for (const region of sampleRegions) {
        while (reservedPageIds.has(soloId)) soloId++;
        const regionName = [region.sido, region.si, region.gugun, region.dong].filter(Boolean).join(' ');
        const itemDate = new Date(now);
        itemDate.setDate(itemDate.getDate() - (dynamicCount % 7));
        items.push({
            title: `${regionName} ${soloKw} 해결 가이드`,
            link: `${siteUrl}/${soloId}/`,
            description: `${regionName} 지역 ${soloKw} 문제를 전문 장비로 점검하고 해결합니다.`,
            pubDate: itemDate.toUTCString(),
        });
        soloId += tails.length;
        dynamicCount++;
    }
}

// RSS 2.0 XML 생성
let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
rss += '  <channel>\n';
rss += `    <title>${escapeXml(siteName)}</title>\n`;
rss += `    <link>${siteUrl}</link>\n`;
rss += `    <description>${escapeXml(siteDescription)}</description>\n`;
rss += `    <language>ko</language>\n`;
rss += `    <lastBuildDate>${now.toUTCString()}</lastBuildDate>\n`;
rss += `    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>\n`;

for (const item of items) {
    rss += '    <item>\n';
    rss += `      <title>${escapeXml(item.title)}</title>\n`;
    rss += `      <link>${item.link}</link>\n`;
    rss += `      <description>${escapeXml(item.description)}</description>\n`;
    rss += `      <pubDate>${item.pubDate}</pubDate>\n`;
    rss += `      <guid>${item.link}</guid>\n`;
    rss += '    </item>\n';
}

rss += '  </channel>\n';
rss += '</rss>';

// 파일 출력
const publicDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', 'out');

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
console.log(`✅ public/rss.xml: ${items.length}개 항목 생성`);

if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'rss.xml'), rss);
    console.log(`✅ out/rss.xml 복사 완료`);
}
