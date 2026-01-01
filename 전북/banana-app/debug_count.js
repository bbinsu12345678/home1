const regions = require('./data/regions.json');
const keywords = require('./data/keywords.json');

function generatePermutations(arr) {
    const result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    }
    permute(arr);
    return result;
}

const targetRegions = regions;
const baseKeywords = keywords.basic.slice(0, 3);
const perms = generatePermutations(baseKeywords);
const tails = keywords.tail || ["10곳 비교"];

let count = 0;
for (const region of targetRegions) {
    for (const perm of perms) {
        for (const tail of tails) {
            count++;
        }
    }
}
console.log('Total paths:', count);
console.log('Regions:', targetRegions.length);
console.log('Perms:', perms.length);
console.log('Tails:', tails.length);
