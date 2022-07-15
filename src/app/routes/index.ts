import {Application} from 'express';
import authRoutes from './auth';
import blogRoutes from './blog';

const routes = (app: Application) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/blog', blogRoutes);
}

export = routes;