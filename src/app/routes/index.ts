import {Application} from 'express';
import authRoutes from './auth';
import blogRoutes from './blog';
import categoryRoutes from './category';

const routes = (app: Application) => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/blog', blogRoutes);
    app.use('/api/v1/category', categoryRoutes);
}

export = routes;