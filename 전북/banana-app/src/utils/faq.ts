import { faqList, FaqData } from "../data/faqs";

// Simple seeded random generator (Linear Congruential Generator)
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const getFaqsById = (idStr: string, count: number = 5): FaqData[] => {
    const id = parseInt(idStr, 10);
    // Use the page ID as the seed base to ensure deterministic results for each page
    // Using a prime multiplier to spread out patterns
    let seed = id * 1337;

    // Create a copy of the list to shuffle
    const shuffled = [...faqList];

    // Fisher-Yates shuffle with seeded random
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed++) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Always ensure the first item mentions the specific keywords if possible, 
    // or just return the top N items from the shuffled list.
    return shuffled.slice(0, count);
};
