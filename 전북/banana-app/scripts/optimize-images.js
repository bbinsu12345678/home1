/**
 * 이미지 최적화 스크립트
 * fixed 폴더의 PNG 이미지를 WebP로 변환하고 크기를 최적화합니다.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FIXED_DIR = path.join(__dirname, '../public/images/fixed');
const BRAND_DIR = path.join(__dirname, '../public/images');

// fixed 이미지 최적화 설정
const fixedImages = [
    { name: '1.png', width: 860, quality: 80 },  // 히어로 이미지
    { name: '2.png', width: 800, quality: 75 },
    { name: '3.png', width: 800, quality: 75 },
    { name: '4.png', width: 800, quality: 75 },
    { name: '5.png', width: 800, quality: 75 },
    { name: '6.png', width: 800, quality: 75 },
];

// 브랜드 이미지 최적화 설정
const brandImages = [
    { name: 'brand_logo.png', width: 100, quality: 85 },
    { name: 'banana_mascot.png', width: 100, quality: 85 },
];

async function optimizeImage(inputPath, outputPath, width, quality) {
    try {
        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        await sharp(inputPath)
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)}: ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% 감소)`);
        return { success: true, savings: parseFloat(savings) };
    } catch (error) {
        console.error(`❌ ${path.basename(inputPath)} 최적화 실패:`, error.message);
        return { success: false };
    }
}

async function main() {
    console.log('\n🚀 이미지 최적화 시작...\n');
    console.log('='.repeat(60));

    let totalSavings = 0;
    let successCount = 0;

    // Fixed 이미지 최적화
    console.log('\n📁 Fixed 폴더 이미지 최적화:\n');
    for (const img of fixedImages) {
        const inputPath = path.join(FIXED_DIR, img.name);
        const outputPath = path.join(FIXED_DIR, img.name.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            const result = await optimizeImage(inputPath, outputPath, img.width, img.quality);
            if (result.success) {
                successCount++;
                totalSavings += result.savings;
            }
        } else {
            console.log(`⚠️ 파일 없음: ${img.name}`);
        }
    }

    // 브랜드 이미지 최적화
    console.log('\n📁 브랜드 이미지 최적화:\n');
    for (const img of brandImages) {
        const inputPath = path.join(BRAND_DIR, img.name);
        const outputPath = path.join(BRAND_DIR, img.name.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            const result = await optimizeImage(inputPath, outputPath, img.width, img.quality);
            if (result.success) {
                successCount++;
                totalSavings += result.savings;
            }
        } else {
            console.log(`⚠️ 파일 없음: ${img.name}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n✨ 완료! ${successCount}개 파일 최적화됨`);
    console.log(`📊 평균 용량 감소율: ${(totalSavings / successCount).toFixed(1)}%\n`);
}

main().catch(console.error);
