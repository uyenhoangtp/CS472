import http from 'http';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    if ((url === '/' || url === '/home') && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my website');
    }
    else if (url === '/image' && method === 'GET') {
        const imagePath = path.join(__dirname, 'files', 'sample.jpg');
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        createReadStream(imagePath).pipe(res);
    }
    else if (url === '/pdf' && method === 'GET') {
        const pdfPath = path.join(__dirname, 'files', 'sample.pdf');
        res.writeHead(200, { 'Content-Type': 'application/pdf' });
        createReadStream(pdfPath).pipe(res);
    }
    else if (url === '/about' && method === 'GET') {
        try {
            const textPath = path.join(__dirname, 'files', 'about.txt');
            const data = await fs.readFile(textPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading about.txt');
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
