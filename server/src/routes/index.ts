import express from 'express';
import usersRoutes from './v1/usersRoutes';
import adminsRoutes from './v1/adminRoutes';

const router = express.Router();


router.use('/v1/users', usersRoutes);
router.use('/v1/admins', adminsRoutes);

export default router;