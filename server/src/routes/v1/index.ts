import express from 'express';
import usersRoutes from './usersRoutes';
import adminRoutes from './adminRoutes';

const router = express.Router();


router.use('/users', usersRoutes);
router.use('/admins', adminRoutes);

export default router;