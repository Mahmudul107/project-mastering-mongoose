import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import Joi from 'joi' //joi validator library

const createStudent = async (req: Request, res: Response) => {
  try {
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .required()
        .trim()
        .max(20)
        .pattern(/^[A-Za-z]+$/, { name: 'alphabet characters' }),
      middleName: Joi.string().trim(),
      lastName: Joi.string()
        .required()
        .trim()
        .pattern(/^[A-Za-z]+$/, { name: 'alphabet characters' }),
    })

    const guardianSchema = Joi.object({
      fatherName: Joi.string().trim().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().trim().required(),
      motherName: Joi.string().trim().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    })

    const localGuardianSchema = Joi.object({
      name: Joi.string().trim().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
      address: Joi.string().required(),
    })

    // Define Joi schema for the main document

    const studentSchema = Joi.object({
      id: Joi.string(),
      name: userNameSchema.required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      dob: Joi.string().required(),
      email: Joi.string().email().required(),
      contactNo: Joi.string().required(),
      emergencyNo: Joi.string().required(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required(),
      presentAddress: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImage: Joi.string().required(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
    }).messages({
      'any.required': '{#label} is required',
    })


    
    const { student: studentData } = req.body
    
    const {error, value} = studentSchema.validate(studentData)

    // console.log(error, value);
    if (error) {
      res.status(500).json({
        success: true,
        message: 'Something went wrong',
        error: error.details
      })
    }

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    // Send response to user
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
