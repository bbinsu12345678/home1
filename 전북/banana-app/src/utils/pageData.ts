import regions from "../../data/regions.json";
import keywords from "../../data/keywords.json";
import { generatePermutations } from "./seo";

export interface PageData {
    id: string;
    region: typeof regions[0];
    keywordPermutation: string[];
    tail: string;
    slug: string[]; // Original korean slug components for display/metadata
}

// Global cache for page data
let allPagesCache: PageData[] | null = null;
const RESERVED_PAGE_IDS = new Set([404, 500]);

export const getAllPages = (): PageData[] => {
    if (allPagesCache) return allPagesCache;

    const pages: PageData[] = [];
    let idCounter = 1;

    // Keyowrd permutations (Top 3)
    const baseKeywords = keywords.basic.slice(0, 3);
    const perms = generatePermutations(baseKeywords);

    // Tail keywords
    const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

    // 그룹1: 기존 3키워드 순열 조합
    for (const region of regions) {
        for (const perm of perms) {
            for (const tail of tails) {
                while (RESERVED_PAGE_IDS.has(idCounter)) {
                    idCounter++;
                }

                const keywordStr = `${perm.join("")} ${tail}`;

                const slugComponents = [
                    region.sido,
                    region.si,
                    region.gugun,
                    region.dong,
                    keywordStr
                ].filter(Boolean);

                pages.push({
                    id: idCounter.toString(),
                    region,
                    keywordPermutation: perm,
                    tail,
                    slug: slugComponents
                });
                idCounter++;
            }
        }
    }

    // 그룹2: 에어컨배관막힘 / 정화조막힘 단독 키워드 페이지
    const soloKeywords = ["에어컨배관막힘", "정화조막힘"];

    for (const region of regions) {
        for (const soloKw of soloKeywords) {
            for (const tail of tails) {
                while (RESERVED_PAGE_IDS.has(idCounter)) {
                    idCounter++;
                }

                const keywordStr = `${soloKw} ${tail}`;

                const slugComponents = [
                    region.sido,
                    region.si,
                    region.gugun,
                    region.dong,
                    keywordStr
                ].filter(Boolean);

                pages.push({
                    id: idCounter.toString(),
                    region,
                    keywordPermutation: [soloKw],
                    tail,
                    slug: slugComponents
                });
                idCounter++;
            }
        }
    }

    allPagesCache = pages;
    return pages;
};

export const getPageById = (id: string): PageData | undefined => {
    const pages = getAllPages();
    return pages.find(p => p.id === id);
};

export const getAllPageIds = (): number[] => {
    return getAllPages()
        .map((page) => Number(page.id))
        .filter((pageId) => Number.isInteger(pageId) && pageId > 0);
};

export const getAllUniqueSi = (): string[] => {
    const siSet = new Set<string>();
    regions.forEach(r => {
        if (r.si) siSet.add(r.si);
    });
    return Array.from(siSet);
};

