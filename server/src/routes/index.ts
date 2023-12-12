import express from 'express';
import usersRoutes from './v1/userRoutes';
import adminsRoutes from './v1/adminRoutes';
import courseRoutes from './v1/courseRoutes';

const router = express.Router();


router.use('/v1/users', usersRoutes);
router.use('/v1/admins', adminsRoutes);
router.use('/v1/course', courseRoutes);

export default router;