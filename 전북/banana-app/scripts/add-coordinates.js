/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// 지역별 대표 좌표 (전북, 전남, 광주 중심)
const regionCoordinates = {
    // 전북
    "전주": { lat: 35.8242, lng: 127.1480 },
    "군산": { lat: 35.9676, lng: 126.7369 },
    "익산": { lat: 35.9483, lng: 126.9578 },
    "남원": { lat: 35.4163, lng: 127.3903 },
    "정읍": { lat: 35.5699, lng: 126.8560 },
    "김제": { lat: 35.8031, lng: 126.8809 },
    "완주": { lat: 35.9051, lng: 127.1617 },
    "진안": { lat: 35.7917, lng: 127.4244 },
    "무주": { lat: 36.0071, lng: 127.6609 },
    "장수": { lat: 35.6478, lng: 127.5212 },
    "임실": { lat: 35.6176, lng: 127.2864 },
    "순창": { lat: 35.3746, lng: 127.1374 },
    "고창": { lat: 35.4351, lng: 126.7019 },
    "부안": { lat: 35.7318, lng: 126.7339 },

    // 전남
    "목포": { lat: 34.8118, lng: 126.3922 },
    "여수": { lat: 34.7604, lng: 127.6622 },
    "순천": { lat: 34.9506, lng: 127.4872 },
    "나주": { lat: 35.0160, lng: 126.7109 },
    "광양": { lat: 34.9407, lng: 127.6958 },
    "담양": { lat: 35.3208, lng: 126.9882 },
    "곡성": { lat: 35.2818, lng: 127.2919 },
    "구례": { lat: 35.2022, lng: 127.4632 },
    "고흥": { lat: 34.6114, lng: 127.2753 },
    "보성": { lat: 34.7714, lng: 127.0799 },
    "화순": { lat: 35.0641, lng: 126.9865 },
    "장흥": { lat: 34.6815, lng: 126.9069 },
    "강진": { lat: 34.6420, lng: 126.7672 },
    "해남": { lat: 34.5733, lng: 126.5989 },
    "영암": { lat: 34.8003, lng: 126.6967 },
    "무안": { lat: 34.9910, lng: 126.4816 },
    "함평": { lat: 35.0661, lng: 126.5158 },
    "영광": { lat: 35.2773, lng: 126.5118 },
    "장성": { lat: 35.3018, lng: 126.7844 },
    "완도": { lat: 34.3115, lng: 126.7550 },
    "진도": { lat: 34.4868, lng: 126.2634 },
    "신안": { lat: 34.8264, lng: 126.1096 },

    // 광주
    "광주": { lat: 35.1595, lng: 126.8526 },
    "동구": { lat: 35.1461, lng: 126.9227 },
    "서구": { lat: 35.1522, lng: 126.8893 },
    "남구": { lat: 35.1328, lng: 126.9026 },
    "북구": { lat: 35.1740, lng: 126.9118 },
    "광산구": { lat: 35.1397, lng: 126.7934 }
};

// 시/군/구에서 좌표 찾기
function getCoordinatesForRegion(region) {
    // si 필드에서 시/군/구 이름 추출
    const si = region.si || '';
    const gugun = region.gugun || '';

    // 정확히 매칭되는 좌표 찾기
    for (const [key, coords] of Object.entries(regionCoordinates)) {
        if (si.includes(key) || gugun.includes(key)) {
            // 약간의 랜덤 오프셋 추가 (같은 시/군 내에서도 다양한 좌표)
            const randomOffset = () => (Math.random() - 0.5) * 0.05; // 약 ±5km
            return {
                lat: parseFloat((coords.lat + randomOffset()).toFixed(6)),
                lng: parseFloat((coords.lng + randomOffset()).toFixed(6))
            };
        }
    }

    // 기본 좌표 (전북 전주)
    const randomOffset = () => (Math.random() - 0.5) * 0.05;
    return {
        lat: parseFloat((35.8242 + randomOffset()).toFixed(6)),
        lng: parseFloat((127.1480 + randomOffset()).toFixed(6))
    };
}

// regions.json 읽기
const regionsPath = path.join(__dirname, '../data/regions.json');
const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));

console.log(`Processing ${regions.length} regions...`);

// 각 지역에 좌표 추가
const updatedRegions = regions.map((region, index) => {
    const coords = getCoordinatesForRegion(region);

    if (index % 500 === 0) {
        console.log(`Processed ${index} / ${regions.length} regions...`);
    }

    return {
        ...region,
        lat: coords.lat,
        lng: coords.lng
    };
});

// 백업 생성
const backupPath = path.join(__dirname, '../data/regions.json.backup');
fs.writeFileSync(backupPath, JSON.stringify(regions, null, 2));
console.log(`✅ Backup created: ${backupPath}`);

// 업데이트된 데이터 저장
fs.writeFileSync(regionsPath, JSON.stringify(updatedRegions, null, 2));
console.log(`✅ Updated ${updatedRegions.length} regions with coordinates`);
console.log(`First region example:`, JSON.stringify(updatedRegions[0], null, 2));
