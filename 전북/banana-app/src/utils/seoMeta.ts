import { SITE_NAME, SITE_ID, SITE_THEME } from "./siteConfig";

export const getSeoMeta = (region: string, keyword: string) => {
    // 신규 키워드(하수구, 맨홀, 오폐수)와 조화롭게 어울리는 20가지 이상의 타이틀 패턴
    const patterns = [
        `[${SITE_NAME}] ${region} ${keyword} 전문 업체 | 출장비 0원`,
        `${region} ${keyword} 1등 업체 추천 - ${SITE_NAME}`,
        `${region} ${keyword} 비용 및 정보 확인하기 | ${SITE_NAME}`,
        `${SITE_NAME}: ${region}에서 가장 신뢰받는 ${keyword} 해결사`,
        `24시간 긴급출동! ${region} ${keyword}는 ${SITE_NAME}에서`,
        `${region} ${keyword} 업체 리스트 및 상담 안내 - ${SITE_NAME}`,
        `${region} ${keyword} 막힘 해결 전문가 ${SITE_NAME}`,
        `${region} ${keyword} 뚫는 곳? ${SITE_NAME}이 정답입니다`,
        `배관 마스터 ${SITE_NAME}: ${region} ${keyword} 완벽 케어`,
        `${region} ${keyword} 시공 잘하는 곳 - ${SITE_NAME} 후기`,
        // 추가된 다양화 패턴 (하수구, 맨홀, 오폐수 최적화)
        `${region} 하수구 맨홀 오폐수 막힘 역류 해결 - ${SITE_NAME}`,
        `${region}에서 가장 꼼꼼한 ${keyword} 전문가 - ${SITE_NAME}`,
        `정직한 정찰제 ${region} ${keyword} 시공 | ${SITE_NAME}`,
        `15년 경력의 노하우, ${region} ${keyword}는 ${SITE_NAME}`,
        `첨단 장비 보유! ${region} ${keyword} 정밀 진단 - ${SITE_NAME}`,
        `한 번에 확실히! ${region} ${keyword} 완벽 뚫음`,
        `${region} 전지역 30분 내 도착 ${keyword} 긴급 수리`,
        `이웃들이 추천하는 ${region} ${keyword} 맛집(?) ${SITE_NAME}`,
        `${region} 하수구 오폐수 전문 - 믿고 맡기는 ${SITE_NAME}`,
        `고민 해결! ${region} ${keyword} 비용 상담은 ${SITE_NAME}`,
        `${region} 실력 있는 ${keyword} 전문 기술진 상시 대기`,
        `확실한 AS 보장! ${region} ${keyword}는 역시 ${SITE_NAME}`
    ];

    const salt = region.length;
    const patternIndex = (SITE_ID - 1 + salt) % patterns.length;
    const title = patterns[patternIndex];

    // 테마별 설명 문구 확장
    const baseDesc = `${region} 지역에서 ${keyword} 문제로 고민이신가요? ${SITE_NAME}이 15년 경력의 노하우와 하수구, 맨홀, 오폐수 전용 고압 세척 장비로 시원하게 해결해 드립니다.`;
    const descriptions: Record<string, string> = {
        PRICE: `[최저가] ${region} ${keyword} 비용 걱정 마세요. ${SITE_NAME}은 투명한 정찰제로 중간 마진 없이 정직하게 시공하며 출장비 0원 혜택을 제공합니다.`,
        SOLUTION: `[정밀진단] 배관 내시경으로 ${region} ${keyword}의 근본 원인을 잡아냅니다. 하수구, 맨홀, 오폐수 등 막힘의 종류에 따른 맞춤형 솔루션을 경험하세요.`,
        EMERGENCY: `[긴급출동] 지금 바로 출동 가능한 ${region} ${keyword} 전문가가 대기 중입니다. 24시간 언제든 30분 내 현장 도착하여 역류 문제를 해결합니다.`,
        REVIEW: `[고객만족] ${region} ${keyword} 실제 이용 고객들의 찬사. ${SITE_NAME}의 신뢰도 높은 후기가 증명하는 확실한 기술력과 친절한 서비스.`,
        EXPERT: `[전문기술] 15년 경력 국가 공인 전문가가 최첨단 장비로 ${region} ${keyword}를 해결합니다. 고압 세척기 및 특수 배관 장비 완비.`,
    };

    const description = descriptions[SITE_THEME] || `${baseDesc} 출장비 0원 및 24시간 상담 진행 중.`;
    return { title, description };
};
