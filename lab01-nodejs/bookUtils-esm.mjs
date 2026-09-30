// Sử dụng từ khóa 'export' trực tiếp trước mỗi hàm
export function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

export function applyDiscount(price, discount) {
    return price - (price * discount);
}

export function isValidISBN(isbn) {
    return isbn.length === 10 || isbn.length === 13;
}