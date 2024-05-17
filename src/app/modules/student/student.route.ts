import { StudentController } from './student.controller';
import express from 'express';

const router = express.Router();

// Will call controller function
router.post('/create-student', StudentController.createStudent);

export const StudentRoutes = router;