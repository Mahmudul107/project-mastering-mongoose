import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

// username sub-schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: 'string',
    required: [true, 'First name is required']
  },
  middleName: {
    type: 'string',
    // required: [true, 'First name is required']
  },
  lastName: {
    type: 'string',
    required: [true, 'Last name is required']
  },
})

// guardian sub-schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: { type: String, required: [true, 'Father occupational status is required'] },
  fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: { type: String, required: [true, "Mother's occupational status is required"] },
  motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
})

// local guardian sub-schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
  contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
  address: { type: String, required: [true, "Local guardian's address is required"] },
})

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    type: userNameSchema,
    required: [true, "Please enter a student name"]
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "The gender field must be one of the following: 'male', 'female', 'other'."
    },
    required: [true, "Please insert a gender"]
  },
  dob: { type: String, required: [true, "Please enter your date of birth"] },
  email: { type: String, required: [true, "Please enter your email"] },
  contactNo: { type: String, required: [true, "Please enter your contact number"] },
  emergencyNo: { type: String, required: [true, "Please enter your emergency contact number"] },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  presentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },

  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImage: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    defaultValue: 'active'
  },
})

// Creating a model
export const StudentModel = model<Student>('Student', studentSchema)
