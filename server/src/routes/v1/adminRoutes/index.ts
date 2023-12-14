import express from 'express';
import { createCourse, deleteCourse, updateCourse } from '../../../controllers/course.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';
import { deleteUser } from '../../../controllers/user.controller';

const router = express.Router();


router.get('/details', (req, res)=>{
   return res.send('Hello admin')
});

router.post("/create-course", isAuthenticted, authorizeRoles("admin"),createCourse);

router.put("/update-course/:id", isAuthenticted, authorizeRoles("admin"), updateCourse);

router.delete("/delete-course/:id", isAuthenticted, authorizeRoles("admin"), deleteCourse);

router.delete("/delete-user/:id", isAuthenticted, authorizeRoles("admin"), deleteUser);


export default router;