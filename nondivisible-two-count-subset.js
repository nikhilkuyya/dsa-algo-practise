

const s = [ 1, 2, 3, 4, 5, 6 ]; 
const k = 3;

const remainderOfS = new Array(k).fill(0);

for (let it = 0; it < s.length; it += 1) {
    const value = s[it];
    const remainder = value % k;
    remainderOfS[remainder] += 1;
}

let pickCount = remainderOfS[0] > 0 ? 1 : 0;

for (let it = 1; it < Math.floor(k / 2) + 1; it += 1) {
    const itpickCount = remainderOfS[it];
    const consectivePickCount = remainderOfS[k - it];
    console.log({ it, itpickCount, consectivePickCount })
    if (it === k - it) {
        pickCount += remainderOfS[it] > 0 ? 1 : 0;
    }else {
        pickCount += Math.max(itpickCount,consectivePickCount);
    }
    
}
console.log(pickCount);