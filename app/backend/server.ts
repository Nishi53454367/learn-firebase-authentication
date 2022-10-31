'use strict';

import express from 'express';
import cors, { CorsOptions } from 'cors';
import firebase from 'firebase-admin';
import { config } from 'dotenv';

// dotenv
config();

// Initialize Firebase Admin SDK
const serviceAccount = require(String(process.env.GOOGLE_APPLICATION_CREDENTIALS));
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

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
app.post('/auth', async (req: any, res: {
  sendStatus(arg0: number): void; send: (arg0: string) => void;
}) => {
  const authHeader = req.headers.authorization;
  // not token
  if (!authHeader) {
    return res.sendStatus(401);
  }
  // check token
  const token = authHeader.split(' ')[1];
  try {
    const result = await firebase.auth().verifyIdToken(token);
    // show uid
    const uid = result.uid;
    console.log(uid);
  } catch (error) {
    console.error(`Error with authentication: ${error}`);
    return res.sendStatus(403);
  }

  res.send('Hello World Auth');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);