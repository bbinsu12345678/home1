// 결정론적 난수 생성기 (시드 기반)
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

interface Business {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    rating: number;
    reviewCount: number;
    distance: number;
    tel: string;
    isAd: boolean; // 광고 여부 체크용
    category: string; // 업종 (배수관 막힘, 배관 뚫음, 하수구 막힘 등)
    classification: string; // 분류 (건설업>배관,냉난방공사 등)
}

export const generateBusinessList = (
    regionFull: string,
    baseLat: number,
    baseLng: number,
    _keyword: string
): Business[] => {
    const businesses: Business[] = [];
    const dong = regionFull.split(" ").pop() || "우리동네";

    // 키워드 형용사
    const adjectives = ["믿음", "으뜸", "제일", "바른", "착한", "명진", "대성", "현대", "우리", "가나"];
    const suffixes = ["설비", "배관", "종합설비", "누수탐지", "하수구", "환경"];

    // 업종 분류 (참조 사이트 기반)
    const categories = ["배수관 막힘", "배관 뚫음", "하수구 막힘", "변기 막힘", "싱크대 막힘"];
    const classifications = [
        "건설업>배관,냉난방공사",
        "건설업>수도설비공사",
        "건설업>전문건설업"
    ];

    // 시드 생성을 위해 지역명 문자열을 숫자로 변환
    const seed = regionFull.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = 1; i <= 10; i++) {
        const r1 = seededRandom(seed + i);
        const r2 = seededRandom(seed + i * 100);
        const r3 = seededRandom(seed + i * 200);

        const adj = adjectives[Math.floor(r1 * adjectives.length)];
        const suf = suffixes[Math.floor(r2 * suffixes.length)];

        // 업종 및 분류 결정론적 할당
        const category = categories[i % categories.length];
        const classification = classifications[i % classifications.length];

        // 좌표 오차 범위 (약 500m~1km 내외)
        const latOffset = (r1 - 0.5) * 0.01;
        const lngOffset = (r2 - 0.5) * 0.01;

        businesses.push({
            id: i,
            name: `${dong} ${adj}${suf}`,
            address: `${regionFull} ${Math.floor(r3 * 900) + 1}번지`,
            lat: baseLat + latOffset,
            lng: baseLng + lngOffset,
            rating: 4.5 + (r1 * 0.5), // 4.5 ~ 5.0
            reviewCount: Math.floor(r2 * 100) + 10,
            distance: Math.floor(r3 * 1000), // m 단위
            tel: `0507-${Math.floor(r1 * 9000) + 1000}-${Math.floor(r2 * 9000) + 1000}`,
            isAd: false,
            category,
            classification
        });
    }

    // 거리순 정렬
    return businesses.sort((a, b) => a.distance - b.distance);
};
