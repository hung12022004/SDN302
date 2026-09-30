# SDN302 - Server-Side Development Project

Dự án phát triển Backend (RESTful API) sử dụng Node.js, Express và MongoDB để quản lý dữ liệu hệ thống (Authors, Books,...).

## 🚀 Công nghệ sử dụng (Tech Stack)

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Công cụ kiểm thử API:** Postman

## 📁 Cấu trúc thư mục (Project Structure)

~~~text
SDN302/
├── config/         # Cấu hình kết nối Database (MongoDB)
├── controllers/    # Xử lý logic nghiệp vụ cho các request
├── models/         # Định nghĩa Mongoose Schemas (Author, Book,...)
├── routes/         # Định nghĩa các API Endpoints
├── .env            # Biến môi trường (PORT, MONGO_URI)
├── package.json    # Quản lý các thư viện phụ thuộc
└── server.js       # Điểm khởi chạy ứng dụng (Entry point)
~~~

## ⚙️ Hướng dẫn cài đặt (Installation)

1. **Clone kho lưu trữ về máy:**
~~~bash
git clone https://github.com/hung12022004/SDN302.git
cd SDN302
~~~

2. **Cài đặt các thư viện phụ thuộc (Dependencies):**
~~~bash
npm install
~~~

3. **Cấu hình biến môi trường (`.env`):**
Tạo file `.env` ở thư mục gốc của dự án và thêm các thông số:
~~~env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/SDN302
~~~

4. **Khởi chạy Server:**
~~~bash
npm start
# Hoặc chạy ở chế độ development (nếu có cài đặt nodemon):
npm run dev
~~~
Server sẽ hoạt động tại địa chỉ: `http://localhost:3000`

## 📌 Các API Endpoints tiêu biểu

| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/authors` | Lấy danh sách toàn bộ tác giả |
| `GET` | `/api/authors/virtual-books` | Truy vấn tác giả kèm danh sách sách (Virtual Populate) |
| `GET` | `/api/authors/:id` | Lấy thông tin chi tiết một tác giả theo ID |
| `POST` | `/api/authors` | Thêm mới một tác giả |
| `PUT` | `/api/authors/:id` | Cập nhật thông tin tác giả |
| `DELETE` | `/api/authors/:id` | Xóa tác giả khỏi hệ thống |

## 👤 Tác giả

* **GitHub:** https://github.com/hung12022004
