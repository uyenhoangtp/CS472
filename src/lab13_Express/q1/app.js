import express from 'express';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//instantiation
const app = express();
// const PORT = 3000; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.get(['/', '/home'], (req, res, next) => {
    res.type('text/plain').send('Welcome to my website');
})

app.get('/image', (req, res, next) => {
    const imagePath = path.join(__dirname, 'public', 'sample.jpg');
    res.type('image/jpeg');
    createReadStream(imagePath).pipe(res);
})

app.get('/pdf', (req, res, next) => {
    const pdfPath = path.join(__dirname, 'public', 'sample.pdf');
    res.type('application/pdf');
    createReadStream(pdfPath).pipe(res);    
})

app.get('/about', async (req, res, next) => {
    try {
        const textPath = path.join(__dirname, 'public', 'about.txt');
        const data = await fs.readFile(textPath, 'utf8');
        res.type('text/plain').send(data);
    } catch (err) {
        res.status(500).type('text/plain').send('Error reading about.txt');
    }
})

app.use((req, res, next) => {
    res.status(404).type('text/plain').send('404 Not Found');
})

//bootup
app.listen(port, () => console.log(`Running on ${port}`))