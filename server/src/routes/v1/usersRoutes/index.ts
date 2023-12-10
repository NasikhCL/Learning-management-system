import express from 'express';
import { activateUser, getUserInfo, logOutUser, loginUser, registrationUser, updatePassword, updateTokens, updateUserInfo } from '../../../controllers/user.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.post('/registration', registrationUser)
router.post('/activate-user', activateUser)
router.post('/login', loginUser);

router.get('/me',isAuthenticted ,getUserInfo);
router.get('/refresh-token', updateTokens);
router.get('/logout',isAuthenticted, authorizeRoles("user") ,logOutUser)


router.put('/update-user-info', isAuthenticted, updateUserInfo)
router.put('/update-user-password', isAuthenticted, updatePassword)
export default router;


