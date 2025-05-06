// const isPrime = (n) => {
//     for (let i = 2, s = Math.sqrt(n); i <= s; i++)
//     if (n % i === 0) return false;
//     return n > 1;
//  };

const isPrime = (n) => {
    return new Promise((resolve, reject) => {
      if (n <= 1) return reject({ prime: false });
  
      for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
        if (n % i === 0) return reject({ prime: false });
      }
  
      resolve({ prime: true });
    });
  };

// start
// end
// { prime: true }

//use async/await instead of .then() and .catch()
console.log('start');
async function checkPrime(n) {
    let result = await isPrime(n);
    console.log(result);
}
checkPrime(7);
console.log('end');