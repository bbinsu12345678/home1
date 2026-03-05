// 갤러리 이미지 목록 관리
export const galleryImages = [
    // KakaoTalk 이미지들
    "KakaoTalk_20250805_175000921.jpg",
    "KakaoTalk_20250805_175000921_01.jpg",
    "KakaoTalk_20250805_175000921_02.jpg",
    "KakaoTalk_20250805_175000921_03.jpg",
    "KakaoTalk_20250805_175000921_04.jpg",
    "KakaoTalk_20250805_175000921_05.jpg",
    "KakaoTalk_20250805_175000921_06.jpg",
    "KakaoTalk_20250805_175000921_07.jpg",
    "KakaoTalk_20250805_175000921_08.jpg",
    "KakaoTalk_20250805_175000921_09.jpg",
    "KakaoTalk_20250805_175000921_11.jpg",
    "KakaoTalk_20250805_175000921_12.jpg",
    "KakaoTalk_20250805_175000921_13.jpg",
    "KakaoTalk_20250805_175000921_14.jpg",
    "KakaoTalk_20250805_175000921_15.jpg",
    "KakaoTalk_20250805_175000921_16.jpg",
    "KakaoTalk_20250805_175000921_18.jpg",
    "KakaoTalk_20250805_175000921_19.jpg",
    "KakaoTalk_20250805_175000921_20.jpg",
    "KakaoTalk_20250805_175000921_21.jpg",
    "KakaoTalk_20250805_175000921_22.jpg",
    "KakaoTalk_20250805_175000921_23.jpg",
    "KakaoTalk_20250805_175000921_24.jpg",
    "KakaoTalk_20250805_175000921_25.jpg",
    "KakaoTalk_20250805_175000921_26.jpg",
    "KakaoTalk_20250805_175000921_28.jpg",
    "KakaoTalk_20250805_175000921_29.jpg",
    "KakaoTalk_20250805_175056769.jpg",
    "KakaoTalk_20250805_175056769_01.jpg",
    "KakaoTalk_20250805_175056769_02.jpg",
    "KakaoTalk_20250805_175056769_03.jpg",
    "KakaoTalk_20250805_175056769_04.jpg",
    "KakaoTalk_20250805_175056769_05.jpg",
    "KakaoTalk_20250805_175056769_06.jpg",
    "KakaoTalk_20250805_175056769_07.jpg",
    "KakaoTalk_20250805_175056769_09.jpg",
    "KakaoTalk_20250805_175056769_10.jpg",
    "KakaoTalk_20250805_175056769_11.jpg",
    "KakaoTalk_20250805_175056769_13.jpg",
    "KakaoTalk_20250805_175056769_14.jpg",
    "KakaoTalk_20250805_175056769_15.jpg",
    "KakaoTalk_20250805_175056769_16.jpg",
    "KakaoTalk_20250805_175056769_18.jpg",
    "KakaoTalk_20250805_175056769_19.jpg",
    "KakaoTalk_20250805_175056769_20.jpg",
    "KakaoTalk_20250805_175056769_21.jpg",
    "KakaoTalk_20250805_175056769_22.jpg",
    "KakaoTalk_20250805_175056769_23.jpg",
    "KakaoTalk_20250805_175056769_24.jpg",
    "KakaoTalk_20250805_175056769_25.jpg",
    "KakaoTalk_20250805_175056769_26.jpg",
    "KakaoTalk_20250805_175056769_27.jpg",
    "KakaoTalk_20250805_175056769_28.jpg",
    "KakaoTalk_20250805_175056769_29.jpg",
    "KakaoTalk_20250805_190844639_01.jpg",
    "KakaoTalk_20250805_190844639_02.jpg",
    "KakaoTalk_20250805_190844639_03.jpg",
    "KakaoTalk_20250805_190844639_04.jpg",
    "KakaoTalk_20250805_190844639_05.jpg",
    "KakaoTalk_20250805_190844639_06.jpg",
    "KakaoTalk_20250805_190844639_07.jpg",
    "KakaoTalk_20250805_190844639_08.jpg",
    "KakaoTalk_20250805_190844639_09.jpg",
    "KakaoTalk_20250805_190844639_10.jpg",
    "KakaoTalk_20250805_190844639_12.jpg",
    "KakaoTalk_20250805_190844639_14.jpg",
    "KakaoTalk_20250805_190844639_16.jpg",
    "KakaoTalk_20250805_190844639_17.jpg",
    "KakaoTalk_20250805_190844639_18.jpg",
    "KakaoTalk_20250805_190844639_20.jpg",
    "KakaoTalk_20250805_190844639_21.jpg",
    "KakaoTalk_20250805_190844639_22.jpg",
    "KakaoTalk_20250805_190844639_23.jpg",
    "KakaoTalk_20250805_190844639_24.jpg",
    "KakaoTalk_20250805_190844639_25.jpg",
    "KakaoTalk_20250805_190844639_26.jpg",
    "KakaoTalk_20250805_190844639_27.jpg",
    "KakaoTalk_20250805_190844639_29.jpg",
    // mosa 이미지들
    "mosa3D8Gab.6.2.jpeg",
    "mosa9dnYZs.jpeg",
    "mosaB3QObb.jpeg",
    "mosabHYILN.jpeg",
    "mosadLfcMh.jpeg",
    "mosafCgw5S.jpeg",
    "mosafL01FA.jpeg",
    "mosaJpDpZb.jpeg",
    "mosalUquvU.jpeg",
    "mosamq09Ao.jpeg",
    "mosaOjUE3R.jpeg",
    "mosaq4e7id.4.24.jpeg",
    "mosaTs7udR.jpeg",
    "mosaVSOo76.jpeg",
    "mosaxhVHYI.jpeg",
    "mosaym1mh0 (1).jpeg",
    // IMG 이미지
    "IMG_3205.24.7.8.jpg",
];

// Fisher-Yates 셔플 알고리즘
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 랜덤으로 n개 이미지 선택
export function getRandomImages(count: number = 12): string[] {
    return shuffleArray(galleryImages).slice(0, count);
}

// 이미지 경로 생성 (WebP 형식 사용)
export function getImagePath(filename: string): string {
    // JPG/JPEG를 WebP로 변환
    const webpFilename = filename.replace(/\.(jpg|jpeg)$/i, '.webp');
    return `/images/gallery/${webpFilename}`;
}
