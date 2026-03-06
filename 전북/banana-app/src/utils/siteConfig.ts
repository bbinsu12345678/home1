/**
 * 전역 웹사이트 설정 및 상수
 */

// 사이트 식별자 (1~10, 기본값 1)
export const SITE_ID = Number(process.env.NEXT_PUBLIC_SITE_ID || "1");

// 사이트별 고유 테마 설정
export const SITE_THEMES = {
    1: { name: "바나나배관", theme: "PRICE", primary: "#FFD700" },
    2: { name: "전북배관수도설비", theme: "SOLUTION", primary: "#1E90FF" },
    3: { name: "정직한배관공", theme: "REVIEW", primary: "#32CD32" },
    4: { name: "24시긴급배관", theme: "EMERGENCY", primary: "#FF4500" },
    5: { name: "전주배관전문가", theme: "EXPERT", primary: "#8B4513" },
    6: { name: "신속변기하수구", theme: "SPEED", primary: "#00CED1" },
    7: { name: "전북하수구해결사", theme: "TRUST", primary: "#4B0082" },
    8: { name: "바른수도공사", theme: "QUALITY", primary: "#FF1493" },
    9: { name: "전주배관테크", theme: "TECH", primary: "#2F4F4F" },
    10: { name: "전북홈케어배관", theme: "FRIENDLY", primary: "#FF8C00" },
};

const currentSite = SITE_THEMES[SITE_ID as keyof typeof SITE_THEMES] || SITE_THEMES[1];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bananajeonju.netlify.app").replace(/\/+$/, "");

export const SITE_NAME = currentSite.name;
export const SITE_THEME = currentSite.theme;
export const BRAND_COLOR = currentSite.primary;

export const DOMAIN_NAME = SITE_URL.replace(/^https?:\/\//, "");
