# 바나나배관 - 전북/전남/광주 배관 전문 업체 안내 사이트

전북, 전남, 광주 지역의 배관막힘, 하수구막힘, 변기막힘 등 관련 업체를 소개하는 정적 사이트 생성 프로젝트입니다.

## 🚀 주요 기능

- **대규모 정적 페이지 생성**: 4,925개의 지역/키워드 조합 페이지 자동 생성
- **SEO 최적화**: 구조화된 JSON-LD, 동적 메타태그, sitemap.xml 자동 생성
- **이미지 최적화**: Netlify Image CDN 통합, WebP 포맷 지원
- **반응형 디자인**: Tailwind CSS 4.0 기반 모바일 최적화
- **빠른 빌드**: Turbopack 기반 Next.js 16.1.6

## 📋 기술 스택

- **프레임워크**: Next.js 16.1.6 (App Router)
- **언어**: TypeScript 5.9.3
- **스타일링**: Tailwind CSS 4.0
- **UI 라이브러리**: React 19.2.3
- **아이콘**: Heroicons
- **배포**: Netlify (Static Export)
- **이미지 최적화**: Netlify Image CDN, Sharp

## 🛠️ 설치 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd banana-app
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택사항)

`.env.local` 파일을 생성하고 다음 변수를 설정합니다:

```bash
NEXT_PUBLIC_SITE_URL=https://bananajeonju.netlify.app
```

## 🚀 실행 방법

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `out/` 디렉토리에 생성됩니다.

### 로컬에서 프로덕션 미리보기

```bash
npm run start
```

## 📁 프로젝트 구조

```
banana-app/
├── data/
│   ├── regions.json          # 50개 지역 데이터 (전북/전남/광주)
│   └── keywords.json          # 키워드 조합 데이터
├── public/
│   ├── images/               # 정적 이미지 파일
│   ├── sitemap.xml           # 자동 생성된 사이트맵
│   └── robots.txt            # 검색엔진 크롤링 설정
├── scripts/
│   └── generate-sitemap-numeric.js  # 사이트맵 생성 스크립트
├── src/
│   ├── app/
│   │   ├── [id]/             # 동적 페이지 라우트 (1~4920)
│   │   ├── gallery/          # 갤러리 페이지
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── page.tsx          # 메인 페이지
│   ├── components/           # React 컴포넌트
│   │   ├── BananaTemplate.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServiceGrid.tsx
│   │   └── ...
│   ├── data/
│   │   ├── faqs.ts           # 395개 FAQ 데이터
│   │   └── seoContent.ts     # SEO 콘텐츠 생성
│   └── utils/
│       ├── pageData.ts       # 페이지 데이터 생성 로직
│       ├── seo.ts            # SEO 유틸리티
│       ├── imageLoader.ts    # Netlify 이미지 로더
│       └── galleryImages.ts  # 갤러리 이미지 목록
├── next.config.ts            # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
└── package.json
```

## 📦 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 3000) |
| `npm run build` | 프로덕션 빌드 + 사이트맵 생성 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |
| `npm run analyze` | 번들 사이즈 분석 |
| `npm run generate:sitemap` | 사이트맵만 생성 |

## 🔧 설정 파일

### next.config.ts

- **output: 'export'**: 정적 HTML 생성
- **trailingSlash: true**: Netlify 호환성
- **images**: 커스텀 이미지 로더 (Netlify CDN)
- **typescript.ignoreBuildErrors: false**: 타입 안전성

### 이미지 최적화

- 개발 환경: 일반 경로 사용
- 프로덕션: Netlify Image CDN (`/.netlify/images`)
- 지원 포맷: WebP
- Quality: 75 (기본값)

## 📊 페이지 생성 로직

1. **지역 데이터**: 50개 지역 (전북 20개, 전남 20개, 광주 10개)
2. **키워드 조합**: 3개 기본 키워드의 순열 (6개)
3. **Tail 키워드**: 16개 종류
4. **총 페이지 수**: 50 × 6 × 16 + 5 (특수 페이지) = **4,925개**

## 🌐 SEO 최적화

- **메타 태그**: 각 페이지별 동적 title, description
- **Open Graph**: SNS 공유 최적화
- **JSON-LD**: LocalBusiness, FAQPage, BreadcrumbList 스키마
- **Sitemap**: 4,922개 URL 포함
- **Robots.txt**: 검색엔진 크롤링 허용

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: `#FF4444` (banana-red)
- **Secondary**: `#FFD700` (banana-yellow)
- **Background**: White, Gray-50
- **Text**: Gray-900, Gray-700

### 주요 섹션

1. Hero Section - 메인 배너
2. Service Category - 서비스 카테고리
3. Intro Section - 소개
4. Why Choose - 선택 이유
5. Process - 진행 절차
6. Region Grid - 지역 목록
7. Gallery - 시공 사례
8. Business List - 업체 리스트
9. FAQ - 자주 묻는 질문
10. Contact - 연락처

## 🚢 배포

### Netlify 배포

1. Netlify에 프로젝트 연결
2. Build command: `npm run build`
3. Publish directory: `out`
4. Node version: `>=18.17.0`

### netlify.toml 설정

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📈 성능

- **빌드 시간**: 약 15초 (4,925 페이지)
- **페이지 크기**: 평균 ~50KB (gzip)
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🛡️ 보안

- **Next.js 16.1.6**: 최신 보안 패치 적용
- **XSS 방지**: JSON-LD 문자열 이스케이프
- **HTTPS**: Netlify 자동 SSL 인증서

## 📝 라이선스

이 프로젝트는 비공개 프로젝트입니다.

## 👥 기여

문의사항이나 버그 리포트는 프로젝트 관리자에게 연락해주세요.

## 🔗 링크

- **사이트**: [https://bananajeonju.netlify.app](https://bananajeonju.netlify.app)
- **Netlify**: Dashboard에서 배포 상태 확인

---

**Last Updated**: 2026-02-12
**Version**: 0.1.0
