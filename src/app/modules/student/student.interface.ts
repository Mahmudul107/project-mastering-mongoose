// import { Schema, model, connect } from 'mongoose'

import { Model } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.

// username sub-interface
export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

// guardian sub-interface
export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

// local guardian sub-interface
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

// 1. Create an interface representing a document in MongoDB.
export type TStudent = {
  id: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dob?: string
  email: string
  contactNo: string
  emergencyNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress?: string
  permanentAddress?: string
  guardian: Guardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
}

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>
}

// Create a new Model type that knows about IUserMethods...
export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
