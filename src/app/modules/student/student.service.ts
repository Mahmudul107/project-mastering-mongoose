import { TStudent } from './student.interface'
import { Student } from '../student/student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) //Built in static method

  const student = new Student(studentData) //Create instance of Student

if  (await student.isUserExists(studentData.id)){
  throw new Error ('user already exists')
}

  const result = await student.save() // built in instance method by Mongoose
  return result
}

// Business logic
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
