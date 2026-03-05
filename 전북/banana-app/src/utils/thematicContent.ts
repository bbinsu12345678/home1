import { SITE_NAME, SITE_THEME } from "./siteConfig";

export const getThematicDescription = (region: string, keyword: string) => {
    const theme = SITE_THEME;
    if (theme === "PRICE") return `${region} ${keyword} 비용 때문에 고민이신가요? ${SITE_NAME}은 거품을 뺀 투명한 정찰제와 출장비 무료 서비스를 통해 고객님의 부담을 덜어드립니다. 하수구부터 맨홀까지 확실하게 뚫어드립니다.`;
    if (theme === "EMERGENCY") return `${region} 전 지역 24시간 긴급 출동 가능! 갑작스러운 ${keyword} 역류로 당황하셨다면 지금 바로 연락주세요. 30분 내로 전문 기술진이 현장에 도착하여 오폐수 문제를 신속하게 해결해 드립니다.`;
    if (theme === "SOLUTION") return `${region}에서 해결 안 되는 타 업체 포기 현장, ${SITE_NAME}이 책임지고 해결합니다. 첨단 배관 내시경과 고압 세척 장비를 활용해 ${keyword} 및 맨홀 막힘의 근본 원인을 정밀 진단하고 완벽하게 소통합니다.`;
    return `${region} ${keyword} 전문 업체 안내 페이지입니다. 유능한 배관 기술진이 하수구, 맨홀, 오폐수 관로 등 모든 배관 문제를 친절하고 정확하게 케어해 드릴 것을 약속드립니다.`;
};
