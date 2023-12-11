import express from 'express';
import { createCourse, updateCourse } from '../../../controllers/course.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.post("/create-course", isAuthenticted, authorizeRoles("admin"),createCourse);

router.put("/update-course/:id", isAuthenticted, authorizeRoles("admin"), updateCourse);

export default router;