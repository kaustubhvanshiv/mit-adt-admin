import express from 'express';
import handler from './api/[...route].js';

const app = express();
app.use(express.json());

// Route all /api/* and /robots.txt requests to the Vercel handler
app.all('/api/*', (req, res) => handler(req, res));
app.get('/robots.txt', (req, res) => handler(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[API Server] Running at http://localhost:${PORT}`);
});
