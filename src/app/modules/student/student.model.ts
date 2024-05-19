import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface'

// username sub-schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: 'string',
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Max length can not exceed 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //     return firstNameStr === value
    //   },
    //   message: '{VALUE} is appropriate',
    // },
  },
  middleName: {
    type: 'string',
    trim: true,
    // required: [true, 'First name is required']
  },
  lastName: {
    type: 'string',
    trim: true,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not a valid',
    // },
  },
})

// guardian sub-schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupational status is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupational status is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
})

// local guardian sub-schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
})

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Please enter a student name'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Please insert a gender'],
  },
  dob: { type: String, required: [true, 'Please enter your date of birth'] },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: "{VALUE} is not valid ,Please enter with your valid email address"
    // }
  },
  contactNo: {
    type: String,
    required: [true, 'Please enter your contact number'],
  },
  emergencyNo: {
    type: String,
    required: [true, 'Please enter your emergency contact number'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
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
    defaultValue: 'active',
  },
})

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser;
}

// Creating a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
