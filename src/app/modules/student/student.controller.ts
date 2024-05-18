import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    // Send response to user
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
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
  } catch (err) {
    console.log(err)
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
  } catch (err) {
    console.log(err)
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
