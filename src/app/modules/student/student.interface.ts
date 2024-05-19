// import { Schema, model, connect } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.

// username sub-interface
export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

// guardian sub-interface
export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

// local guardian sub-interface
export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

// 1. Create an interface representing a document in MongoDB.
export type Student = {
  id: string
  name: UserName
  gender: 'male' | 'female' | 'other'
  dob?: string
  email: string
  contactNo: string
  emergencyNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress?: string
  permanentAddress?: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
}
