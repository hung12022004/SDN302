console.log("1. Bắt đầu (Sync)");

setTimeout(() => console.log("4. setTimeout (Timers phase)"), 0);
setImmediate(() => console.log("5. setImmediate (Check phase)"));
process.nextTick(() => console.log("2. process.nextTick (Microtask)"));
Promise.resolve().then(() => console.log("3. Promise resolved (Microtask)"));

console.log("6. Kết thúc (Sync)");