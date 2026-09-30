const os = require('os');
const path = require('path');

// 1. In thông điệp chào mừng
console.log("=========================================");
console.log("Xin chào! Tôi là: Nguyen Phi Hung - DE180809");
console.log("21/9", new Date().toLocaleDateString());
console.log("=========================================");

// 2. Lấy tham số từ dòng lệnh (process.argv)
const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);

if (!isNaN(num1) && !isNaN(num2)) {
    console.log(`Số thứ nhất: ${num1}, Số thứ hai: ${num2}`);
    console.log(`Tổng: ${num1 + num2}`);
    console.log(`Hiệu: ${num1 - num2}`);
    console.log(`Tích: ${num1 * num2}`);
    console.log(`Thương: ${num1 / num2}`);
} else {
    console.log("Vui lòng truyền vào 2 số. Ví dụ: node app.js 12 4");
}

console.log("=========================================");

// 3. Sử dụng module os và path
console.log("Thông tin hệ thống:");
console.log(`- Nền tảng (Platform): ${os.platform()}`);
console.log(`- Số lượng CPU: ${os.cpus().length}`);
console.log(`- Bộ nhớ trống (Free Memory): ${os.freemem()} bytes`);
console.log(`- Đường dẫn tuyệt đối của file: ${path.resolve(__filename)}`);