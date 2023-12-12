import express from 'express';
import { createCourse, getAllCourses, getCourseWithContent, getCoursesById, updateCourse } from '../../../controllers/course.controller';
import { authorizeRoles, isAuthenticted } from '../../../middleware/auth';

const router = express.Router();

router.get("/get-courses", getAllCourses);
router.get("/get-course/:id",getCoursesById);
router.get("/get-course-content/:id",isAuthenticted, getCourseWithContent);

router.post("/create-course", isAuthenticted, authorizeRoles("admin"),createCourse);

router.put("/update-course/:id", isAuthenticted, authorizeRoles("admin"), updateCourse);
export default router;