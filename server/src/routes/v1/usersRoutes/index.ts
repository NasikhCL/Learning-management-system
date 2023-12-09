import express from 'express';
import { activateUser, logOutUser, loginUser, registrationUser } from '../../../controllers/user.controller';
import { isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.post('/registration', registrationUser)
router.post('/activate-user', activateUser)
router.post('/login', loginUser);
router.get('/logout',isAuthenticted ,logOutUser)
export default router;


