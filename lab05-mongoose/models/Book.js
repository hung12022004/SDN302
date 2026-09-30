const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tiêu đề sách là bắt buộc'], // Custom error message 1
        minlength: [3, 'Tiêu đề phải có ít nhất 3 ký tự'], // Custom error message 2
        trim: true
    },
    slug: { type: String },
    isbn: {
        type: String,
        required: [true, 'ISBN là bắt buộc'],
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Giá sách tối thiểu là 1'],
        max: [1000, 'Giá sách tối đa là 1000']
    },
    quantity: { type: Number, default: 10, min: 0 },
    publishedYear: {
        type: Number,
        validate: {
            // Yêu cầu 4: Custom validator (Năm xuất bản không được ở tương lai)
            validator: function(v) {
                return v <= new Date().getFullYear();
            },
            message: props => `Năm xuất bản (${props.value}) không được lớn hơn năm hiện tại!`
        }
    },
    publishedDate: { type: Date, default: Date.now },
    inStock: { type: Boolean, default: true },
    category: {
        type: String,
        enum: {
            values: ['IT', 'Science', 'History', 'Language'],
            message: '{VALUE} không phải là danh mục hợp lệ'
        },
        required: true
    },
    tags: { type: [String], default: [] }
}, {
    timestamps: true, // Yêu cầu 2: Bật timestamps
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Yêu cầu 5: Virtual property (Không lưu trong DB)
bookSchema.virtual('priceWithTax').get(function() {
    return +(this.price * 1.1).toFixed(2);
});

// Yêu cầu 5: Pre('save') hook tạo slug tự động từ title
bookSchema.pre('save', function() {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().trim().replace(/\s+/g, '-');
    }
});

// Yêu cầu 5: Post('save') hook log ra ID của document mới tạo
bookSchema.post('save', function(doc) {
    console.log(`[Post-Save Hook] Đã lưu sách thành công với ID: ${doc._id}`);
});

// Yêu cầu 5: Instance method kiểm tra tồn kho
bookSchema.methods.checkAvailability = function() {
    return this.inStock && this.quantity > 0 ? 'Còn hàng' : 'Hết hàng';
};

// Yêu cầu 5: Static method tìm theo category
bookSchema.statics.findByCategory = function(categoryName) {
    return this.find({ category: categoryName });
};

module.exports = mongoose.model('Book', bookSchema);