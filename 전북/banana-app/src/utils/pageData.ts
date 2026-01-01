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

export const getAllPages = (): PageData[] => {
    if (allPagesCache) return allPagesCache;

    const pages: PageData[] = [];
    let idCounter = 1;

    // Keyowrd permutations (Top 3)
    const baseKeywords = keywords.basic.slice(0, 3);
    const perms = generatePermutations(baseKeywords);

    // Tail keywords
    const tails = keywords.tail && keywords.tail.length > 0 ? keywords.tail : ["10곳 비교"];

    for (const region of regions) {
        for (const perm of perms) {
            for (const tail of tails) {
                const keywordStr = `${perm.join("")} ${tail}`;

                // original slug components
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

    allPagesCache = pages;
    return pages;
};

export const getPageById = (id: string): PageData | undefined => {
    const pages = getAllPages();
    return pages.find(p => p.id === id);
};
