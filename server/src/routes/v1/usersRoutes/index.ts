import express from 'express';
import { activateUser, logOutUser, loginUser, registrationUser } from '../../../controllers/user.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.post('/registration', registrationUser)
router.post('/activate-user', activateUser)
router.post('/login', loginUser);
router.get('/logout',isAuthenticted, authorizeRoles("admin") ,logOutUser)
export default router;


