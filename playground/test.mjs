import { nextTick } from 'node:process';

nextTick(() => {Promise.resolve().then(() => console.log('test'));
console.log('0');});
Promise.resolve().then(() => console.log(2));
queueMicrotask(() => console.log(3));
nextTick(() => console.log(1));
nextTick(() => console.log('1b'));
Promise.resolve().then(() => console.log('2a'));
queueMicrotask(() =>  console.log('3a'));

