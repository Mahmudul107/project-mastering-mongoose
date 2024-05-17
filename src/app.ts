import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'

const app: Application = express()

// const port = 3000;

// parsers
app.use(express.json())
app.use(cors())

//Application routes
app.use('/api/v1/students', StudentRoutes)

app.get('/', (req: Request, res: Response) => {
  const a = 10
  res.send(a)
})

// console.log(process.cwd());

export default app
