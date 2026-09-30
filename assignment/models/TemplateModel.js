const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    // 1. Các kiểu dữ liệu & Validation cơ bản (Lab 5)
    title: { 
        type: String, 
        required: [true, 'Trường này là bắt buộc'], 
        minlength: [3, 'Tối thiểu 3 ký tự'],
        unique: true,
        trim: true 
    },
    slug: { type: String },
    price: { 
        type: Number, 
        required: true, 
        min: [0, 'Giá không được âm'], 
        max: [10000, 'Giá vượt quá giới hạn'] 
    },
    status: {
        type: String,
        enum: { values: ['active', 'inactive'], message: '{VALUE} không hợp lệ' },
        default: 'active'
    },
    publishedYear: {
        type: Number,
        // Custom validator
        validate: {
            validator: function(v) { return v <= new Date().getFullYear(); },
            message: props => `Năm (${props.value}) không hợp lệ!`
        }
    },
    tags: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },

    // 2. Liên kết bảng - Reference (Lab 6) -> Xóa đi nếu đề không yêu cầu bảng phụ
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// 3. Virtual Property tính toán (Lab 5)
sampleSchema.virtual('priceWithTax').get(function() {
    return +(this.price * 1.1).toFixed(2);
});

// 4. Virtual Populate (Lab 6 - Dùng ở bảng 1 như Author/Category để lấy danh sách bảng nhiều)
/*
sampleSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
});
*/

// 5. Middleware Hooks (Lab 5 - Không dùng next để tránh lỗi)
sampleSchema.pre('save', function() {
    if (this.isModified('title')) {
        this.slug = this.title.toLowerCase().trim().replace(/\s+/g, '-');
    }
});

sampleSchema.post('save', function(doc) {
    console.log(`Đã lưu thành công ID: ${doc._id}`);
});

module.exports = mongoose.model('Sample', sampleSchema);