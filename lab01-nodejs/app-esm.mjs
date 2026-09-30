// Sử dụng 'import' thay vì 'require'
import { formatPrice, applyDiscount, isValidISBN } from './bookUtils-esm.mjs';

console.log("=========================================");
console.log("--- CHẠY PHIÊN BẢN ES MODULES (ESM) ---");
const price = 50.5;
console.log(`- Giá gốc: ${formatPrice(price)}`);
console.log(`- Giá sau giảm 10%: ${formatPrice(applyDiscount(price, 0.1))}`);
console.log(`- ISBN '1234567890' (10 ký tự) hợp lệ không? ${isValidISBN('1234567890')}`);
console.log("=========================================");