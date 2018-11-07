import express from 'express';
import parcelsRoutes from './routes/parcels';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';

const app = express();
const apiVersion = '/api/v1';

// parcels endpoint
app.use(`${apiVersion}/parcels`, parcelsRoutes);

// user endpoint
app.use(`${apiVersion}/user`, userRoutes);

// admin endpoint
app.use(`${apiVersion}/admin`, adminRoutes);

module.exports = app;
