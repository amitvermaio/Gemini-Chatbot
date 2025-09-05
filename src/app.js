import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*name', (req, res) => {
  res.sendFile('index.html');
})

export { app };