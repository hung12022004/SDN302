console.log("--- TEST 1: BLOCKING (CHẶN LUỒNG) ---");
const startBlock = Date.now();

// Cài đặt Timer 0ms, lý thuyết là chạy ngay lập tức
setTimeout(() => {
    console.log(`[Timer 1] Chạy sau: ${Date.now() - startBlock}ms (Bị delay do vòng lặp)`);
}, 0);

console.log("Đang chạy vòng lặp 3 tỷ lần (Sẽ làm đơ máy vài giây)...");
let count = 0;
for (let i = 0; i < 3000000000; i++) {
    count++;
}
console.log(`Vòng lặp đồng bộ kết thúc sau: ${Date.now() - startBlock}ms`);

console.log("\n--- TEST 2: NON-BLOCKING (KHÔNG CHẶN) ---");
const startNonBlock = Date.now();

setTimeout(() => {
    console.log(`[Timer 2] Chạy sau: ${Date.now() - startNonBlock}ms`);
}, 0);

// Mô phỏng tác vụ bất đồng bộ không chặn luồng chính
Promise.resolve().then(() => {
    console.log(`Tác vụ Promise hoàn thành sau: ${Date.now() - startNonBlock}ms`);
});

console.log("Lệnh này in ra ngay lập tức, luồng chính không bị kẹt!");