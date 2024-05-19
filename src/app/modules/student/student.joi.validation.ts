import Joi from 'joi' //joi validator library


// Data validation with Joi
const userNameValidationSchema = Joi.object({
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

  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  })

  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  })

  // Define Joi schema for the main document

  const studentValidationSchema = Joi.object({
    id: Joi.string(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dob: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyNo: Joi.string().required(),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .required(),
    presentAddress: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImage: Joi.string().required(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  }).messages({
    'any.required': '{#label} is required',
  })





 export default studentValidationSchema