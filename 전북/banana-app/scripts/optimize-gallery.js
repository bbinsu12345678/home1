/**
 * 갤러리 이미지 최적화 스크립트
 * JPG/JPEG 이미지를 WebP로 변환하고 크기를 최적화합니다.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');

// 최적화 설정
const CONFIG = {
    maxWidth: 480,      // 최대 너비 (갤러리 썸네일 기준)
    quality: 75,        // WebP 품질 (75가 적정)
    deleteOriginal: false  // 원본 삭제 여부
};

async function optimizeGalleryImage(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    if (!['.jpg', '.jpeg'].includes(ext)) {
        return { skipped: true };
    }

    const outputPath = inputPath.replace(/\.(jpg|jpeg)$/i, '.webp');

    try {
        const inputStats = fs.statSync(inputPath);
        const inputSizeKB = (inputStats.size / 1024).toFixed(2);

        await sharp(inputPath)
            .resize(CONFIG.maxWidth, null, { withoutEnlargement: true })
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(2);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)}: ${inputSizeKB}KB → ${outputSizeKB}KB (${savings}% 감소)`);

        if (CONFIG.deleteOriginal) {
            fs.unlinkSync(inputPath);
        }

        return {
            success: true,
            savings: parseFloat(savings),
            savedBytes: inputStats.size - outputStats.size
        };
    } catch (error) {
        console.error(`❌ ${path.basename(inputPath)} 최적화 실패:`, error.message);
        return { success: false };
    }
}

async function main() {
    console.log('\n🚀 갤러리 이미지 최적화 시작...\n');
    console.log('='.repeat(60));
    console.log(`📂 대상 폴더: ${GALLERY_DIR}`);
    console.log(`📐 최대 너비: ${CONFIG.maxWidth}px`);
    console.log(`🎨 품질: ${CONFIG.quality}%`);
    console.log('='.repeat(60));

    const files = fs.readdirSync(GALLERY_DIR);
    const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f));

    console.log(`\n📸 발견된 JPG 파일: ${jpgFiles.length}개\n`);

    let totalSavings = 0;
    let totalSavedBytes = 0;
    let successCount = 0;

    for (const file of jpgFiles) {
        const inputPath = path.join(GALLERY_DIR, file);
        const result = await optimizeGalleryImage(inputPath);

        if (result.success) {
            successCount++;
            totalSavings += result.savings;
            totalSavedBytes += result.savedBytes;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n✨ 완료! ${successCount}/${jpgFiles.length}개 파일 최적화됨`);
    console.log(`📊 평균 용량 감소율: ${(totalSavings / successCount).toFixed(1)}%`);
    console.log(`💾 총 절약 용량: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB\n`);
}

main().catch(console.error);
