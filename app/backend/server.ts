'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World');
});

app.get('/auth', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World Auth');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);