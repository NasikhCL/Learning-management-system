import express from 'express';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';
import { deleteUser } from '../../../controllers/user.controller';

const router = express.Router();


router.get('/details', (req, res)=>{
   return res.send('Hello admin')
});

router.delete("/delete-user/:id", isAuthenticted, authorizeRoles("admin"), deleteUser);


export default router;