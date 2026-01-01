export const generatePermutations = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    const permutations: string[][] = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const remainingPerms = generatePermutations(remaining);
        for (const p of remainingPerms) {
            permutations.push([current, ...p]);
        }
    }
    return permutations;
};

// 랜덤 셔플 함수 (피셔-예이츠 알고리즘)
export const shuffleArray = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// 텍스트에서 조사 제거 및 정규화
export const normalizeKeyword = (text: string): string => {
    return text.replace(/가$|이$|은$|는$|을$|를$/g, "");
};

interface VideoMap {
    [key: string]: string;
}

// 유튜브 영상 ID 추출
export const getVideoId = (keyword: string, videoMap: VideoMap): string => {
    for (const key in videoMap) {
        if (keyword.includes(key)) return videoMap[key];
    }
    return videoMap["default"];
};
