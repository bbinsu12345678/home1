const fs = require('fs');
const path = require('path');

// 실제 전국 지역 데이터 (주요 시/도와 구/군 기반)
const nationalRegions = [
  // 서울특별시 (25개 구)
  { sido: '서울특별시', si: '서울시', gugun: '강남구', baseCoords: { lat: 37.5172, lng: 127.0473 } },
  { sido: '서울특별시', si: '서울시', gugun: '강동구', baseCoords: { lat: 37.5301, lng: 127.1238 } },
  { sido: '서울특별시', si: '서울시', gugun: '강북구', baseCoords: { lat: 37.6396, lng: 127.0257 } },
  { sido: '서울특별시', si: '서울시', gugun: '강서구', baseCoords: { lat: 37.5509, lng: 126.8495 } },
  { sido: '서울특별시', si: '서울시', gugun: '관악구', baseCoords: { lat: 37.4784, lng: 126.9516 } },
  { sido: '서울특별시', si: '서울시', gugun: '광진구', baseCoords: { lat: 37.5384, lng: 127.0822 } },
  { sido: '서울특별시', si: '서울시', gugun: '구로구', baseCoords: { lat: 37.4954, lng: 126.8874 } },
  { sido: '서울특별시', si: '서울시', gugun: '금천구', baseCoords: { lat: 37.4519, lng: 126.8955 } },
  { sido: '서울특별시', si: '서울시', gugun: '노원구', baseCoords: { lat: 37.6542, lng: 127.0568 } },
  { sido: '서울특별시', si: '서울시', gugun: '도봉구', baseCoords: { lat: 37.6688, lng: 127.0471 } },
  { sido: '서울특별시', si: '서울시', gugun: '동대문구', baseCoords: { lat: 37.5744, lng: 127.0398 } },
  { sido: '서울특별시', si: '서울시', gugun: '동작구', baseCoords: { lat: 37.5124, lng: 126.9393 } },
  { sido: '서울특별시', si: '서울시', gugun: '마포구', baseCoords: { lat: 37.5663, lng: 126.9019 } },
  { sido: '서울특별시', si: '서울시', gugun: '서대문구', baseCoords: { lat: 37.5791, lng: 126.9368 } },
  { sido: '서울특별시', si: '서울시', gugun: '서초구', baseCoords: { lat: 37.4837, lng: 127.0324 } },
  { sido: '서울특별시', si: '서울시', gugun: '성동구', baseCoords: { lat: 37.5634, lng: 127.0368 } },
  { sido: '서울특별시', si: '서울시', gugun: '성북구', baseCoords: { lat: 37.5894, lng: 127.0167 } },
  { sido: '서울특별시', si: '서울시', gugun: '송파구', baseCoords: { lat: 37.5145, lng: 127.1059 } },
  { sido: '서울특별시', si: '서울시', gugun: '양천구', baseCoords: { lat: 37.5170, lng: 126.8664 } },
  { sido: '서울특별시', si: '서울시', gugun: '영등포구', baseCoords: { lat: 37.5264, lng: 126.8962 } },
  { sido: '서울특별시', si: '서울시', gugun: '용산구', baseCoords: { lat: 37.5324, lng: 126.9900 } },
  { sido: '서울특별시', si: '서울시', gugun: '은평구', baseCoords: { lat: 37.6027, lng: 126.9291 } },
  { sido: '서울특별시', si: '서울시', gugun: '종로구', baseCoords: { lat: 37.5735, lng: 126.9792 } },
  { sido: '서울특별시', si: '서울시', gugun: '중구', baseCoords: { lat: 37.5641, lng: 126.9979 } },
  { sido: '서울특별시', si: '서울시', gugun: '중랑구', baseCoords: { lat: 37.6063, lng: 127.0925 } },

  // 부산광역시
  { sido: '부산광역시', si: '부산시', gugun: '해운대구', baseCoords: { lat: 35.1631, lng: 129.1635 } },
  { sido: '부산광역시', si: '부산시', gugun: '수영구', baseCoords: { lat: 35.1456, lng: 129.1133 } },
  { sido: '부산광역시', si: '부산시', gugun: '동래구', baseCoords: { lat: 35.2048, lng: 129.0836 } },
  { sido: '부산광역시', si: '부산시', gugun: '남구', baseCoords: { lat: 35.1361, lng: 129.0844 } },
  { sido: '부산광역시', si: '부산시', gugun: '부산진구', baseCoords: { lat: 35.1629, lng: 129.0530 } },
  { sido: '부산광역시', si: '부산시', gugun: '금정구', baseCoords: { lat: 35.2430, lng: 129.0918 } },
  { sido: '부산광역시', si: '부산시', gugun: '사하구', baseCoords: { lat: 35.1043, lng: 128.9746 } },
  { sido: '부산광역시', si: '부산시', gugun: '북구', baseCoords: { lat: 35.1978, lng: 128.9895 } },

  // 대구광역시
  { sido: '대구광역시', si: '대구시', gugun: '중구', baseCoords: { lat: 35.8692, lng: 128.6060 } },
  { sido: '대구광역시', si: '대구시', gugun: '동구', baseCoords: { lat: 35.8868, lng: 128.6354 } },
  { sido: '대구광역시', si: '대구시', gugun: '서구', baseCoords: { lat: 35.8718, lng: 128.5593 } },
  { sido: '대구광역시', si: '대구시', gugun: '남구', baseCoords: { lat: 35.8463, lng: 128.5975 } },
  { sido: '대구광역시', si: '대구시', gugun: '북구', baseCoords: { lat: 35.8858, lng: 128.5829 } },
  { sido: '대구광역시', si: '대구시', gugun: '수성구', baseCoords: { lat: 35.8581, lng: 128.6303 } },

  // 인천광역시
  { sido: '인천광역시', si: '인천시', gugun: '중구', baseCoords: { lat: 37.4738, lng: 126.6216 } },
  { sido: '인천광역시', si: '인천시', gugun: '동구', baseCoords: { lat: 37.4738, lng: 126.6432 } },
  { sido: '인천광역시', si: '인천시', gugun: '미추홀구', baseCoords: { lat: 37.4635, lng: 126.6506 } },
  { sido: '인천광역시', si: '인천시', gugun: '연수구', baseCoords: { lat: 37.4106, lng: 126.6782 } },
  { sido: '인천광역시', si: '인천시', gugun: '남동구', baseCoords: { lat: 37.4475, lng: 126.7314 } },
  { sido: '인천광역시', si: '인천시', gugun: '부평구', baseCoords: { lat: 37.5070, lng: 126.7219 } },
  { sido: '인천광역시', si: '인천시', gugun: '계양구', baseCoords: { lat: 37.5376, lng: 126.7376 } },
  { sido: '인천광역시', si: '인천시', gugun: '서구', baseCoords: { lat: 37.5454, lng: 126.6759 } },

  // 광주광역시
  { sido: '광주광역시', si: '광주시', gugun: '동구', baseCoords: { lat: 35.1462, lng: 126.9230 } },
  { sido: '광주광역시', si: '광주시', gugun: '서구', baseCoords: { lat: 35.1528, lng: 126.8895 } },
  { sido: '광주광역시', si: '광주시', gugun: '남구', baseCoords: { lat: 35.1328, lng: 126.9026 } },
  { sido: '광주광역시', si: '광주시', gugun: '북구', baseCoords: { lat: 35.1740, lng: 126.9118 } },
  { sido: '광주광역시', si: '광주시', gugun: '광산구', baseCoords: { lat: 35.1397, lng: 126.7935 } },

  // 대전광역시
  { sido: '대전광역시', si: '대전시', gugun: '중구', baseCoords: { lat: 36.3255, lng: 127.4211 } },
  { sido: '대전광역시', si: '대전시', gugun: '동구', baseCoords: { lat: 36.3504, lng: 127.4545 } },
  { sido: '대전광역시', si: '대전시', gugun: '서구', baseCoords: { lat: 36.3558, lng: 127.3837 } },
  { sido: '대전광역시', si: '대전시', gugun: '유성구', baseCoords: { lat: 36.3624, lng: 127.3565 } },
  { sido: '대전광역시', si: '대전시', gugun: '대덕구', baseCoords: { lat: 36.3465, lng: 127.4165 } },

  // 울산광역시
  { sido: '울산광역시', si: '울산시', gugun: '중구', baseCoords: { lat: 35.5692, lng: 129.3323 } },
  { sido: '울산광역시', si: '울산시', gugun: '남구', baseCoords: { lat: 35.5437, lng: 129.3300 } },
  { sido: '울산광역시', si: '울산시', gugun: '동구', baseCoords: { lat: 35.5049, lng: 129.4163 } },
  { sido: '울산광역시', si: '울산시', gugun: '북구', baseCoords: { lat: 35.5827, lng: 129.3614 } },

  // 경기도 주요 시
  { sido: '경기도', si: '수원시', gugun: '장안구', baseCoords: { lat: 37.3006, lng: 127.0097 } },
  { sido: '경기도', si: '수원시', gugun: '권선구', baseCoords: { lat: 37.2586, lng: 126.9729 } },
  { sido: '경기도', si: '수원시', gugun: '팔달구', baseCoords: { lat: 37.2793, lng: 127.0289 } },
  { sido: '경기도', si: '수원시', gugun: '영통구', baseCoords: { lat: 37.2573, lng: 127.0718 } },
  { sido: '경기도', si: '성남시', gugun: '수정구', baseCoords: { lat: 37.4505, lng: 127.1477 } },
  { sido: '경기도', si: '성남시', gugun: '중원구', baseCoords: { lat: 37.4345, lng: 127.1541 } },
  { sido: '경기도', si: '성남시', gugun: '분당구', baseCoords: { lat: 37.3826, lng: 127.1214 } },
  { sido: '경기도', si: '용인시', gugun: '처인구', baseCoords: { lat: 37.2336, lng: 127.2019 } },
  { sido: '경기도', si: '용인시', gugun: '기흥구', baseCoords: { lat: 37.2759, lng: 127.1158 } },
  { sido: '경기도', si: '용인시', gugun: '수지구', baseCoords: { lat: 37.3215, lng: 127.0969 } },
  { sido: '경기도', si: '고양시', gugun: '덕양구', baseCoords: { lat: 37.6356, lng: 126.8328 } },
  { sido: '경기도', si: '고양시', gugun: '일산동구', baseCoords: { lat: 37.6588, lng: 126.7733 } },
  { sido: '경기도', si: '고양시', gugun: '일산서구', baseCoords: { lat: 37.6775, lng: 126.7689 } },
  { sido: '경기도', si: '화성시', gugun: '화성시', baseCoords: { lat: 37.1996, lng: 126.8313 } },
  { sido: '경기도', si: '안양시', gugun: '만안구', baseCoords: { lat: 37.3897, lng: 126.9100 } },
  { sido: '경기도', si: '안양시', gugun: '동안구', baseCoords: { lat: 37.3911, lng: 126.9518 } },
  { sido: '경기도', si: '부천시', gugun: '부천시', baseCoords: { lat: 37.5034, lng: 126.7660 } },
  { sido: '경기도', si: '남양주시', gugun: '남양주시', baseCoords: { lat: 37.6360, lng: 127.2164 } },
  { sido: '경기도', si: '안산시', gugun: '단원구', baseCoords: { lat: 37.3160, lng: 126.7936 } },
  { sido: '경기도', si: '안산시', gugun: '상록구', baseCoords: { lat: 37.2966, lng: 126.8322 } },
  { sido: '경기도', si: '평택시', gugun: '평택시', baseCoords: { lat: 36.9922, lng: 127.1127 } },
  { sido: '경기도', si: '시흥시', gugun: '시흥시', baseCoords: { lat: 37.3800, lng: 126.8028 } },
  { sido: '경기도', si: '파주시', gugun: '파주시', baseCoords: { lat: 37.7599, lng: 126.7800 } },
  { sido: '경기도', si: '김포시', gugun: '김포시', baseCoords: { lat: 37.6152, lng: 126.7157 } },
  { sido: '경기도', si: '의정부시', gugun: '의정부시', baseCoords: { lat: 37.7381, lng: 127.0338 } },

  // 강원특별자치도
  { sido: '강원특별자치도', si: '춘천시', gugun: '춘천시', baseCoords: { lat: 37.8813, lng: 127.7299 } },
  { sido: '강원특별자치도', si: '원주시', gugun: '원주시', baseCoords: { lat: 37.3422, lng: 127.9202 } },
  { sido: '강원특별자치도', si: '강릉시', gugun: '강릉시', baseCoords: { lat: 37.7519, lng: 128.8761 } },
  { sido: '강원특별자치도', si: '동해시', gugun: '동해시', baseCoords: { lat: 37.5247, lng: 129.1143 } },
  { sido: '강원특별자치도', si: '속초시', gugun: '속초시', baseCoords: { lat: 38.2070, lng: 128.5918 } },

  // 충청북도
  { sido: '충청북도', si: '청주시', gugun: '상당구', baseCoords: { lat: 36.6357, lng: 127.4914 } },
  { sido: '충청북도', si: '청주시', gugun: '서원구', baseCoords: { lat: 36.6378, lng: 127.4403 } },
  { sido: '충청북도', si: '청주시', gugun: '흥덕구', baseCoords: { lat: 36.6431, lng: 127.4290 } },
  { sido: '충청북도', si: '청주시', gugun: '청원구', baseCoords: { lat: 36.6673, lng: 127.4872 } },
  { sido: '충청북도', si: '충주시', gugun: '충주시', baseCoords: { lat: 36.9910, lng: 127.9260 } },
  { sido: '충청북도', si: '제천시', gugun: '제천시', baseCoords: { lat: 37.1326, lng: 128.1911 } },

  // 충청남도
  { sido: '충청남도', si: '천안시', gugun: '동남구', baseCoords: { lat: 36.7909, lng: 127.1528 } },
  { sido: '충청남도', si: '천안시', gugun: '서북구', baseCoords: { lat: 36.8151, lng: 127.1139 } },
  { sido: '충청남도', si: '아산시', gugun: '아산시', baseCoords: { lat: 36.7898, lng: 127.0020 } },
  { sido: '충청남도', si: '서산시', gugun: '서산시', baseCoords: { lat: 36.7849, lng: 126.4503 } },
  { sido: '충청남도', si: '당진시', gugun: '당진시', baseCoords: { lat: 36.8895, lng: 126.6477 } },

  // 전북특별자치도
  { sido: '전북특별자치도', si: '전주시', gugun: '완산구', baseCoords: { lat: 35.8200, lng: 127.1400 } },
  { sido: '전북특별자치도', si: '전주시', gugun: '덕진구', baseCoords: { lat: 35.8495, lng: 127.1296 } },
  { sido: '전북특별자치도', si: '익산시', gugun: '익산시', baseCoords: { lat: 35.9484, lng: 126.9576 } },
  { sido: '전북특별자치도', si: '군산시', gugun: '군산시', baseCoords: { lat: 35.9677, lng: 126.7366 } },
  { sido: '전북특별자치도', si: '정읍시', gugun: '정읍시', baseCoords: { lat: 35.5698, lng: 126.8560 } },

  // 전라남도
  { sido: '전라남도', si: '목포시', gugun: '목포시', baseCoords: { lat: 34.8118, lng: 126.3922 } },
  { sido: '전라남도', si: '여수시', gugun: '여수시', baseCoords: { lat: 34.7604, lng: 127.6622 } },
  { sido: '전라남도', si: '순천시', gugun: '순천시', baseCoords: { lat: 34.9507, lng: 127.4872 } },
  { sido: '전라남도', si: '나주시', gugun: '나주시', baseCoords: { lat: 35.0160, lng: 126.7107 } },
  { sido: '전라남도', si: '광양시', gugun: '광양시', baseCoords: { lat: 34.9407, lng: 127.6956 } },

  // 경상북도
  { sido: '경상북도', si: '포항시', gugun: '남구', baseCoords: { lat: 36.0190, lng: 129.3435 } },
  { sido: '경상북도', si: '포항시', gugun: '북구', baseCoords: { lat: 36.0322, lng: 129.3650 } },
  { sido: '경상북도', si: '경주시', gugun: '경주시', baseCoords: { lat: 35.8562, lng: 129.2247 } },
  { sido: '경상북도', si: '구미시', gugun: '구미시', baseCoords: { lat: 36.1195, lng: 128.3445 } },
  { sido: '경상북도', si: '안동시', gugun: '안동시', baseCoords: { lat: 36.5684, lng: 128.7294 } },

  // 경상남도
  { sido: '경상남도', si: '창원시', gugun: '의창구', baseCoords: { lat: 35.2538, lng: 128.6405 } },
  { sido: '경상남도', si: '창원시', gugun: '성산구', baseCoords: { lat: 35.2195, lng: 128.6811 } },
  { sido: '경상남도', si: '창원시', gugun: '마산합포구', baseCoords: { lat: 35.1333, lng: 128.5651 } },
  { sido: '경상남도', si: '창원시', gugun: '마산회원구', baseCoords: { lat: 35.2115, lng: 128.5811 } },
  { sido: '경상남도', si: '창원시', gugun: '진해구', baseCoords: { lat: 35.1333, lng: 128.7095 } },
  { sido: '경상남도', si: '김해시', gugun: '김해시', baseCoords: { lat: 35.2285, lng: 128.8894 } },
  { sido: '경상남도', si: '진주시', gugun: '진주시', baseCoords: { lat: 35.1800, lng: 128.1076 } },
  { sido: '경상남도', si: '양산시', gugun: '양산시', baseCoords: { lat: 35.3350, lng: 129.0374 } },

  // 제주특별자치도
  { sido: '제주특별자치도', si: '제주시', gugun: '제주시', baseCoords: { lat: 33.4996, lng: 126.5312 } },
  { sido: '제주특별자치도', si: '서귀포시', gugun: '서귀포시', baseCoords: { lat: 33.2541, lng: 126.5601 } },

  // 세종특별자치시
  { sido: '세종특별자치시', si: '세종시', gugun: '세종시', baseCoords: { lat: 36.4875, lng: 127.2817 } },
];

// 각 지역에 동(洞) 데이터 추가
const regions = [];
let idCounter = 1;

nationalRegions.forEach((region) => {
  // 각 구/군마다 5-10개의 동 생성
  const dongCount = Math.floor(Math.random() * 6) + 5; // 5~10개

  for (let i = 1; i <= dongCount; i++) {
    const lat = region.baseCoords.lat + (Math.random() - 0.5) * 0.05;
    const lng = region.baseCoords.lng + (Math.random() - 0.5) * 0.05;

    regions.push({
      sido: region.sido,
      si: region.si,
      gugun: region.gugun,
      dong: `${i}동`,
      full: `${region.sido} ${region.si} ${region.gugun} ${i}동`,
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6))
    });

    idCounter++;
  }
});

// 파일 저장
const outputPath = path.join(__dirname, '..', 'data', 'regions.json');
fs.writeFileSync(outputPath, JSON.stringify(regions, null, 2), 'utf-8');

console.log(`✅ Generated ${regions.length} national regions`);
console.log(`📍 File saved to: ${outputPath}`);

// 통계 출력
const sidoStats = {};
regions.forEach(r => {
  sidoStats[r.sido] = (sidoStats[r.sido] || 0) + 1;
});

console.log('\n📊 Regions by 시/도:');
Object.entries(sidoStats).sort((a, b) => b[1] - a[1]).forEach(([sido, count]) => {
  console.log(`  ${sido}: ${count}`);
});
