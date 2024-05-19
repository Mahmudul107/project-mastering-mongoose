import { z } from 'zod';

// UserName validation schema
const userNameValidationSchema = z.object({
  firstName: z.string().trim().max(20, 'Max length can not exceed 20 characters'),
  middleName: z.string(),
  lastName: z.string().trim(),
});

// Guardian validation schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string().trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian validation schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student validation schema
const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dob: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});


export default studentValidationSchema;