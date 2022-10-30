'use strict';

import express from 'express';
import cors, { CorsOptions } from 'cors';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// CORS Settings
const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// App
const app = express();
app.use(cors(corsOptions));

// API
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World');
});

// Auth API
app.post('/auth', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World Auth');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);