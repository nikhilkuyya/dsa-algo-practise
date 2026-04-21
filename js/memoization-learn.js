// Task 1: Write a function, times10, that takes an argument, n, and multiples n times 10
// a simple multiplication fn
const times10 = (n) => {
  console.count('time10 -> function');
  return 10*n;
};

console.log('~~~~~~~~~~~~~~TASK 1~~~~~~~~~~~~~~');
console.log('times10 returns:', times10(9));

// Task 2: Use an object to cache the results of your times10 function. 
// protip 1: Create a function that checks if the value for n has been calculated before.
// protip 2: If the value for n has not been calculated, calculate and then save the result in the cache object.

const cache = {};

const memoTimes10 = (n) => {
  let result;
  if(n in cache) {
    result = cache[n];
  }else {
    result = times10(n);  
    cache[JSON.stringify(n)] = result;
  }  
  return result;
}

console.log('~~~~~~~~~~~~~~TASK 2~~~~~~~~~~~~~~');
console.log('Task 2 calculated value:', memoTimes10(9));	// calculated
console.log('Task 2 cached value:', memoTimes10(9));	// cached



// Task 3: Clean up your global scope by moving your cache inside your function.
// protip: Use a closure to return a function that you can call later.

const memoizedClosureTimes10 = () => {
  const localCache = {};
  function memoClosureOverTimes10(n){
    const lookupKey = JSON.stringify(n);
    let result;
    if(lookupKey in localCache){
      result = localCache[lookupKey]
    }else {
      result = times10(n);
      localCache[lookupKey] = result;
    }
    return result;
  }
  return memoClosureOverTimes10;
};

const memoClosureTimes10 = memoizedClosureTimes10();
console.log('~~~~~~~~~~~~~~TASK 3~~~~~~~~~~~~~~');
try {
  console.log('Task 3 calculated value:', memoClosureTimes10(9));	// calculated
  console.log('Task 3 cached value:', memoClosureTimes10(9));	// cached
} catch(e) {
  console.error('Task 3:', e);
}




// protip: Take advantage of the fact that parameters are saved in the closure as well, just like the cache from the previous example.
const memoize = (cb) => {
  const genericMemoCache = {
  }  
  function ClosureOverCallBack(...args){
    const inputLookup = JSON.stringify(args);
    let result;
    if(inputLookup in genericMemoCache) {
      result = genericMemoCache[inputLookup];
    }else {
      result = cb(...args);
      genericMemoCache[inputLookup] = result;
    }
    return result;
  }
  return ClosureOverCallBack;
}
function addOne(x) {
  console.count('addone');
  return x + 1;
} 
function addTwoInput(x,y){
  console.count('addTwoInput');
  return x + y;
}
// returned function from memoizedAdd
const memoizedTimes10 = memoize(times10);
const memoizedaddOne = memoize(addOne);
const memoizedTimes10_2 = memoize(times10);
const memoizedaddTwoInput = memoize(addTwoInput);

console.log('~~~~~~~~~~~~~~TASK 4~~~~~~~~~~~~~~');
try {
  console.log('Task 4 calculated value:', memoizedTimes10(9));	// calculated
  console.log('Task 4 cached value:', memoizedTimes10(9));	// cached

  console.log('Task 4 calculated addOne value:', memoizedaddOne(9));	// calculated
  console.log('Task 4 cached addOne value:', memoizedaddOne(9));	// cached

  console.log('Task 4 calculated memo new callback value:', memoizedTimes10_2(9));	// calculated
  console.log('Task 4 cached memo new callback value:', memoizedTimes10_2(9));	// cached

  console.log('Task 4 calculated add Two Input value:', memoizedaddTwoInput(9,10));	// calculated
  console.log('Task 4 cached add Two Input value:', memoizedaddTwoInput(9,10));	// cached


} catch(e) {
  console.error('Task 4:', e)
}