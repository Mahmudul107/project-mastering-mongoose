import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation' /* Joi validation */
import { z } from "zod"; /* Zod validation */
import studentValidationSchema from './student.zod.validation';
import { error } from 'console';

const createStudent = async (req: Request, res: Response) => {
  try {

    // Creating a schema validation using Zod

    const { student: studentData } = req.body

    //Zod
    const zodParsedData = studentValidationSchema.parse(studentData)
    
    // // Data validation with Joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData)
    

    // // console.log(error, value);
    // if (error) {
    //   res.status(500).json({
    //     success: true,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   })
    // }

    // Send response to user
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

// Create a new controller and get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  }catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

// Create a new controller and get a single student

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params
  try {
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    })
  }catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

// Delete student from db
const deleteStudent = async (req: Request, res: Response) => {
  try{
    const {studentId} = req.params;

    const result = await StudentServices.deleteSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result
    })
  }
  catch(err: any) {
    res.status(500).json({
      success: false,
      message: err.message || ' Something went wrong',
      error: err
    })
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
}
