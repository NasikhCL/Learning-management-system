import express from 'express';
import { activateUser, getUserInfo, logOutUser, loginUser, registrationUser, updateTokens } from '../../../controllers/user.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.post('/registration', registrationUser)
router.post('/activate-user', activateUser)
router.post('/login', loginUser);

router.get('/me',isAuthenticted ,getUserInfo);
router.get('/refresh-token', updateTokens);
router.get('/logout',isAuthenticted, authorizeRoles("user") ,logOutUser)

export default router;


