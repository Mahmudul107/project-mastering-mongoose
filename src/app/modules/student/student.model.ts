import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

// username sub-schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: 'string',
  },
  middleName: {
    type: 'string',
  },
  lastName: {
    type: 'string',
    required: true,
  },
})

// guardian sub-schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

// local guardian sub-schema
const localGuardianSchema = new Schema <LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
})


// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dob: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  guardian: guardianSchema,

  localGuardian: localGuardianSchema,
  profileImage: { type: String, required: true },
  isActive: ['active', 'blocked'],
})


// Creating a model 
export const StudentModel = model<Student>('Student', studentSchema);
