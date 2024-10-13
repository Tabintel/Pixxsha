import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/authRoutes';
import { photoRoutes } from './routes/photoRoutes';
import { dashboardRoutes } from './routes/dashboardRoutes'; 

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

export { app };
