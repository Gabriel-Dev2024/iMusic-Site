import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './lib/db.js';
import { clerlMiddleware } from '@clerk/express';

import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/albums.route.js';
import statsRoutes from './routes/stats.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Para analisar o req.body

app.use(clerlMiddleware()); // Isto vai adicionar autenticação ao req obj => req.auth.userId

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
    console.log('Server rodando na porta ' + PORT)
    connectDB();
})