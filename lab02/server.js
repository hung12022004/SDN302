const http = require('http');
const url = require('url');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const booksFile = path.join(__dirname, 'books.json');
const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'access.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Khai báo các loại định dạng tệp (MIME types)
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.js': 'text/javascript'
};

const server = http.createServer(async (req, res) => {
    // Ghi log truy cập
    const logEntry = `${new Date().toISOString()} - ${req.method} - ${req.url}\n`;
    fs.appendFile(logFile, logEntry, (err) => { if (err) console.error(err); });

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // --- XỬ LÝ STATIC FILES (Yêu cầu 5) ---
    if (pathname.startsWith('/public/')) {
        const filePath = path.join(__dirname, pathname);
        const extname = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found - File khong ton tai</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content); // Trả về nội dung tệp (HTML, CSS, hoặc ảnh)
            }
        });
        return; // Dừng thực thi các logic bên dưới
    }

    // --- XỬ LÝ TẢI FILE (Yêu cầu 5) ---
    if (pathname === '/download') {
        const fileToDownload = path.join(__dirname, 'public', 'image.jpg'); 
        fs.readFile(fileToDownload, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Header 'Content-Disposition: attachment' ép trình duyệt tải file về
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg',
                    'Content-Disposition': 'attachment; filename="booknest-image.jpg"'
                });
                res.end(content);
            }
        });
        return;
    }

    // --- XỬ LÝ API BOOKS (Yêu cầu 3 & 4) ---
    if (pathname === '/api/books') {
        if (req.method === 'GET') {
            try {
                const data = await fsPromises.readFile(booksFile, 'utf8');
                let books = JSON.parse(data);
                if (parsedUrl.query.category) {
                    books = books.filter(b => b.category === parsedUrl.query.category);
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(books));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Lỗi máy chủ" }));
            }
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', async () => {
                try {
                    const newBook = JSON.parse(body);
                    const data = await fsPromises.readFile(booksFile, 'utf8');
                    const books = JSON.parse(data);
                    newBook.id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
                    books.push(newBook);
                    await fsPromises.writeFile(booksFile, JSON.stringify(books, null, 2));
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newBook));
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Lỗi máy chủ" }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Method Not Allowed" }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));