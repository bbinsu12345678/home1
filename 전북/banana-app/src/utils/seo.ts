import { PageData } from "./pageData";

// Title 생성 함수 - 6가지 패턴을 페이지 ID 기반으로 순환
export const generateSeoTitle = (regionName: string, keyword: string, pageId: string): string => {
    const id = parseInt(pageId);
    const patterns = [
        `${regionName} ${keyword} 견적 비교는 어떻게 해야 효율적일까요?`,
        `${regionName} ${keyword} 가까운 곳`,
        `${regionName} ${keyword} 빠른 출동 업체`,
        `${regionName} ${keyword} 지도 보고 바로 문의하기`,
        `${regionName}에서 찾아본 ${keyword}`,
        `${regionName} ${keyword} 24시간 긴급 상담`
    ];
    return patterns[id % 6];
};

export const generateSeoDescription = (regionName: string, keyword: string): string => {
    return `${regionName} 일대 ${keyword} 등 5개 업종 기준으로 검색에서 찾은 업체 중 위치·주소 정보가 명확한 곳의 위치와 지도를 한 화면에서 확인할 수 있습니다.`;
};

export const generateJsonLd = (regionName: string, keyword: string, pageId?: string) => {
    // 참조 사이트와 동일하게 고정 날짜 사용
    const datePublished = "2025-12-11T15:23:54+01:00";
    const dateModified = new Date().toISOString();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${regionName} ${keyword} 가까운 곳`,
        "author": {
            "@type": "Person",
            "name": "관리자"
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "publisher": {
            "@type": "Organization",
            "name": "지역업체 안내"
        },
        "image": {
            "@type": "ImageObject",
            "url": "https://bananajeonju.netlify.app/images/fixed/1.png",
            "width": 800,
            "height": 600
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `${regionName} ${keyword} 관련 업체를 한 번에 확인할 수 있는 곳이 있나요?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${regionName} 지역 ${keyword} 등 관련 업종 업체를 한 곳에 모아 소개해 드리는 상담·안내 페이지입니다. 소개해 드리는 지역에서 검색되는 업종은 본문에 정리된 각 업체 정보와 연락처를 통해 직접 확인해 주세요.`
                }
            },
            {
                "@type": "Question",
                "name": "싱크대 막힘을 방지하기 위해 정기적으로 해야 할 것은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "싱크대 막힘을 방지하기 위해서는 설거지 전에 식기에 묻은 기름기와 음식물 찌꺼기를 휴지로 닦아내거나 음식물 쓰레기통에 따로 버리는 것을 정기적으로 해야 합니다. 또한, 주기적으로 (3개월에 1회 정도) 베이킹소다와 식초를 이용한 자연적인 배관 청소를 하고, 뜨겁지 않은 물을 충분히 흘려보내 배관 내벽에 찌꺼기가 쌓이는 것을 막아야 합니다."
                }
            },
            {
                "@type": "Question",
                "name": "하수구 막힘 뚫음 작업 후 물이 완전히 내려가지 않는 이유는?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "하수구 뚫음 작업 후에도 물이 완전히 내려가지 않는다면, 이는 막힘의 원인이 완전히 제거되지 않았거나 혹은 배관 구조 자체에 문제가 있다는 의미일 수 있습니다. 찌꺼기가 일시적으로 흩어졌다가 다시 뭉쳤거나, 배관이 심하게 노후되어 내부가 좁아진 상태일 수 있습니다. 또한, 배관이 역구배(기울기가 반대)로 시공되어 물이 고여 있을 가능성도 있습니다. 이 경우 배관 내시경 검사를 통해 잔여 이물질이나 구조적 문제를 확인해야 합니다."
                }
            },
            {
                "@type": "Question",
                "name": "난방 배관 누수로 인해 보일러 압력이 계속 떨어진다면 어떻게 해야 하나요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "난방 배관 누수로 인해 보일러 압력이 지속적으로 떨어지는 현상이 있다면, 이는 난방수가 새고 있다는 명확한 징후입니다. 첫째, 더 이상의 난방수 손실과 누수 피해 확산을 막기 위해 보일러의 난방 기능을 끄고 보일러 하단의 직수 공급 밸브를 잠가 보충수가 들어가지 않도록 조치해야 합니다. 둘째, 누수탐지 전문가에게 즉시 연락하여 난방 배관 압력 검사와 열화상 카메라 탐지 등을 통해 누수 지점을 정확히 찾아내고 파열된 배관 부위를 보수 또는 교체하는 작업을 진행해야 합니다. 압력 저하를 방치하면 보일러 자체에도 무리가 갈 수 있으므로 신속한 조치가 필수적입니다."
                }
            },
            {
                "@type": "Question",
                "name": "변기 막힘을 유발하는 가장 흔한 원인은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "변기 막힘의 가장 흔한 원인은 물에 녹지 않는 물티슈, 과도한 양의 화장지, 그리고 실수로 떨어뜨린 장난감이나 화장품 용기 같은 이물질입니다. 특히 물티슈는 배관 내에서 분해되지 않고 다른 찌꺼기와 엉겨 붙어 심각한 막힘을 유발하므로 반드시 휴지통에 버려야 합니다."
                }
            },
            {
                "@type": "Question",
                "name": "하수구에서 올라오는 악취를 해결할 수 있는 방법이 있을까요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "하수구 악취는 배관 내부에 쌓인 오물이나 트랩의 봉수 파괴가 원인인 경우가 많습니다. 1차적으로 하수구 트랩을 설치하여 냄새 역류를 차단할 수 있으며, 배관 내부의 슬러지가 원인이라면 전문 장비를 이용한 배관 세척이 필요할 수 있습니다."
                }
            },
            {
                "@type": "Question",
                "name": "겨울철 배관 동파를 예방하기 위한 관리 팁은 무엇입니까?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "겨울철 동파 예방을 위해 외부에 노출된 배관은 보온재로 감싸고, 기온이 급격히 떨어지는 밤에는 수도꼭지를 아주 조금만 틀어 물이 흐르게 유지하는 것이 좋습니다. 만약 배관이 얼었다면 갑지기 뜨거운 물을 붓기보다는 미지근한 물이나 헤어드라이어로 서서히 녹여야 배관 파손을 막을 수 있습니다."
                }
            },
            {
                "@type": "Question",
                "name": "일반적인 통풍 작업과 고압 세척의 차이점은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "일반적인 통풍 작업(스프링 등)은 막힌 구간을 뚫어 물길을 내는 방식인 반면, 고압 세척은 강한 수압을 이용해 배관 내벽에 붙은 기름 슬러지와 이물질을 완전히 씻어내 새 배관처럼 만드는 작업입니다. 자주 막히는 하수구나 식당 같은 곳에서는 고압 세척이 훨씬 효과적이고 오래 유지됩니다."
                }
            }
        ]
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": `${regionName} ${keyword} 현장 영상`,
        "description": `${regionName} 지역 ${keyword} 실제 작업 케이스 - 바나나배관 전문가의 작업 과정`,
        "thumbnailUrl": "https://img.youtube.com/vi/DL-zlugGLvg/maxresdefault.jpg",
        "uploadDate": datePublished,
        "contentUrl": "https://www.youtube.com/watch?v=DL-zlugGLvg",
        "embedUrl": "https://www.youtube.com/embed/DL-zlugGLvg",
        "duration": "PT5M"
    };

    return { articleSchema, faqSchema, videoSchema };
};

export const generatePermutations = (arr: string[]): string[][] => {
    if (arr.length === 0) return [[]];
    const firstElem = arr[0];
    const rest = arr.slice(1);
    const permsWithoutFirst = generatePermutations(rest);
    const allPermutations: string[][] = [];

    permsWithoutFirst.forEach((perm) => {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), firstElem, ...perm.slice(i)];
            allPermutations.push(permWithFirst);
        }
    });

    return allPermutations;
};
