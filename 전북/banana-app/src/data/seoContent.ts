export interface SeoContentItem {
    title: string;
    content: string;
}

// 지역별 특화 콘텐츠
const regionSpecificContent: Record<string, { intro: string; feature: string }> = {
    // 전북 지역
    "전주": {
        intro: "전주시는 한옥마을과 전통 가옥이 밀집한 지역으로, 노후 배관 문제가 빈번하게 발생합니다.",
        feature: "한옥 특유의 배관 구조에 최적화된 전문 장비와 노하우로 문화재급 건물도 안전하게 시공합니다."
    },
    "군산": {
        intro: "군산시는 해안 지역 특성상 염분과 습기로 인한 배관 부식이 자주 발생합니다.",
        feature: "해양 환경에 강한 내부식성 장비와 오랜 경험으로 군산 지역 배관 문제를 확실하게 해결합니다."
    },
    "익산": {
        intro: "익산시는 산업단지와 주거지역이 혼재되어 있어 다양한 유형의 배관 막힘이 발생합니다.",
        feature: "상업용, 주거용 배관을 모두 경험한 전문 기술진이 신속하게 문제를 진단하고 해결합니다."
    },

    // 전남 지역
    "목포": {
        intro: "목포시는 항구 도시 특성상 해양성 기후로 인한 배관 노화와 막힘이 자주 발생합니다.",
        feature: "목포 지역 특유의 배관 환경을 잘 아는 전문 기술진이 최적의 솔루션을 제공합니다."
    },
    "여수": {
        intro: "여수시는 석유화학 산업단지 인근 지역으로 산업용, 가정용 배관 문제 모두 경험이 풍부합니다.",
        feature: "여수 엑스포 이후 급증한 신축 건물과 구도심 노후 배관 모두 전문적으로 대응합니다."
    },
    "순천": {
        intro: "순천시는 순천만 습지와 함께 자연친화적 주거지가 많아 친환경 배관 관리가 중요합니다.",
        feature: "환경을 생각하는 친환경 세척제와 비파괴 공법으로 순천 지역 배관 문제를 해결합니다."
    },
    "나주": {
        intro: "나주시는 농촌과 신도시가 공존하는 지역으로 다양한 배관 시스템이 혼재합니다.",
        feature: "구도심 노후 배관부터 혁신도시 신축 배관까지 모든 유형에 대응 가능합니다."
    },
    "광양": {
        intro: "광양시는 제철소 인근 지역으로 수질 특성에 맞는 배관 관리가 필요합니다.",
        feature: "광양 지역 수질 환경을 고려한 맞춤형 배관 청소와 막힘 해결 서비스를 제공합니다."
    },

    // 광주 지역
    "광주": {
        intro: "광주광역시는 대도시 특성상 고층 건물과 대형 상업시설의 복잡한 배관 시스템이 많습니다.",
        feature: "광주 전 지역(동구, 서구, 남구, 북구, 광산구) 24시간 긴급 출동 체계를 갖추고 있습니다."
    },
    "광주시": {
        intro: "광주광역시는 호남의 중심 도시로 다양한 건축물과 배관 시스템이 존재합니다.",
        feature: "광주 5개 구(동구, 서구, 남구, 북구, 광산구) 어디든 30분 내 신속 출동합니다."
    }
};

// 키워드별 특화 콘텐츠
const keywordSpecificContent: Record<string, { cause: string; solution: string }> = {
    "변기막힘": {
        cause: "휴지, 물티슈, 생리대, 이물질 등이 변기 트랩에 걸려 막힘이 발생합니다.",
        solution: "전용 변기 뚫어뻥과 고압 세척으로 막힘을 해결하고, 배관 내시경으로 잔여물을 확인합니다."
    },
    "싱크대막힘": {
        cause: "음식물 찌꺼기, 기름때, 세제 찌꺼기가 배관 벽에 쌓여 막힘을 유발합니다.",
        solution: "고압 세척과 전문 스케일링으로 배관 내부를 새것처럼 깨끗하게 복원합니다."
    },
    "하수구막힘": {
        cause: "외부 이물질, 나뭇잎, 흙, 쓰레기 등이 하수구에 쌓여 막힘이 발생합니다.",
        solution: "강력한 흡입 장비와 고압 세척으로 하수구 전체를 깨끗하게 청소합니다."
    },
    "배관막힘": {
        cause: "오래된 배관의 스케일 축적, 녹, 이물질로 인해 물 흐름이 막힙니다.",
        solution: "배관 내시경 진단 후 최적의 방법(고압 세척, 스케일링, 교체)을 제안합니다."
    },
    "욕조막힘": {
        cause: "머리카락, 비누 찌꺼기, 피부 각질이 뭉쳐 배수구에 막힘을 일으킵니다.",
        solution: "특수 분쇄 장비로 뭉친 이물질을 제거하고 배관을 깨끗하게 세척합니다."
    }
};

export const getSeoContent = (region: string, keyword: string): SeoContentItem[] => {
    // 지역명에서 시/도 접미사 제거하여 매칭
    const regionKey = region.replace(/특별자치도|광역시|도|시|군|구/g, "").trim();
    const keywordKey = keyword.replace(/\s/g, "");

    // 지역 특화 콘텐츠 가져오기
    const regionContent = regionSpecificContent[regionKey] ||
        regionSpecificContent[region] ||
        { intro: `${region} 지역은 다양한 주거 환경이 공존하는 지역입니다.`, feature: `${region} 전 지역 24시간 긴급 출동 시스템을 갖추고 있습니다.` };

    // 키워드 특화 콘텐츠 가져오기
    const keywordContent = keywordSpecificContent[keywordKey] ||
        keywordSpecificContent["배관막힘"];

    return [
        {
            title: `${region} ${keyword} 발생 원인과 전문 해결법`,
            content: `${regionContent.intro}

<strong>${keyword} 주요 원인:</strong>
${keywordContent.cause}

<strong>바나나배관 전문 해결법:</strong>
${keywordContent.solution}

${regionContent.feature}
현장 도착 즉시 원인 분석부터 해결, 마무리 청소까지 원스톱으로 진행해 드립니다.`
        },
        {
            title: `${keyword} 예방을 위한 생활 습관`,
            content: `이런 장비들을 사용해 문제를 해결하기 전 평소 생활습관만 개선한다면 ${region} <mark>${keyword}</mark> 예방이 가능하단 사실을 기억해 주시길 바랍니다.

평소 배관의 건강을 살피고 꾸준한 관리로 ${region} <mark>하수구막힘</mark> 예방을 해주는 것입니다.

<strong>예방 수칙:</strong>
• 음식물 찌꺼기는 싱크대가 아닌 별도의 용기에 분리하여 버리기
• 기름은 <mark>배수구</mark>에 흘려보내지 않고 키친타월로 닦아내거나 따로 모아 배출
• 머리카락은 욕실 배수구 거름망에 모아서 정기적으로 제거
• 월 1회 베이킹소다와 식초로 간단한 배관 청소

작은 실천이 큰 막힘을 예방할 수 있습니다.`
        },
        {
            title: `전문 장비를 활용한 확실한 해결`,
            content: `가정용 도구로는 해결되지 않는 깊은 막힘은 전문 장비가 필요합니다.

<strong>바나나배관 전문 장비:</strong>

1. <mark>배관 내시경</mark> - 눈에 보이지 않는 배관 내부의 문제 원인을 정확히 파악
2. <mark>플렉스 샤프트</mark> - 강력한 분쇄력으로 딱딱한 이물질 분쇄
3. <mark>고압 세척기</mark> - 배관 벽에 달라붙은 유지방 덩어리와 이물질 완벽 제거

단순히 뚫는 것을 넘어, 배관을 새것처럼 깨끗하게 스케일링하여 반복되는 막힘을 방지합니다.

15년 경력의 전문 기술진이 최신 장비로 확실하게 해결해 드립니다.`
        },
        {
            title: `${region} 지역 맞춤형 긴급 출동 서비스`,
            content: `갑작스러운 ${keyword} 상황은 당황스러울 수밖에 없습니다.

<strong>바나나배관 서비스 특징:</strong>

• <mark>24시간 긴급 출동</mark> - 평일, 주말, 공휴일, 야간 상관없이 상시 대기
• <mark>출장비 0원</mark> - 현장 방문 후 투명한 견적 안내
• <mark>미해결 시 0원</mark> - 해결되지 않으면 비용 청구 없음
• <mark>30분 내 도착</mark> - ${region} 전 지역 신속 출동

${regionContent.feature}

투명한 견적과 확실한 A/S로 믿고 맡길 수 있는 서비스를 약속드립니다.
지금 바로 전화 주세요: <mark>010-2115-3496</mark>`
        }
    ];
};
