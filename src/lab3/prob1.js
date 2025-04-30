'use strict';

console.log("Solution A is");

let computeSumOfSquares = function(arr) {
    return arr.map(x => Math.pow(x,2)).reduce((sum, val) => sum + val, 0);
}
console.log(computeSumOfSquares([1, 2, 3])); // 14

let printOddNumbersOnly = (arr) => {
    let oddNumbers = arr.filter(x => x % 2 !== 0);
    console.log(oddNumbers.join(", "));
}
console.log("Solution B is");
printOddNumbersOnly([1, 2, 3, 4, 5]); // 1 3 5

console.log("Solution C is");

function printFibo (n, a, b) {
    function generate(n, a, b) {
        if (n === 0) return [];
        if (n === 1) return [a];
        return [a, ...generate(n - 1, b, a + b)];
      }
    
      const result = generate(n, a, b);
      console.log(result.join(", "));
}

printFibo(1, 0, 1);
printFibo(10, 0, 1); 