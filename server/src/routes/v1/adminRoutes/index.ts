import express from 'express';
import { createCourse } from '../../../controllers/course.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();


router.get('/details', (req, res)=>{
   return res.send('Hello admin')
});

router.post("/create-course",isAuthenticted , authorizeRoles("admin"),createCourse);

export default router;