import express from 'express';
import usersRoutes from './v1/usersRoutes'

const router = express.Router();


router.get('/v1/users', usersRoutes);


export default router;