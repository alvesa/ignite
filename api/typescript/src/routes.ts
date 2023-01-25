import { Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({ name: 'Node', educator: 'Andre' })

  return res.send()
}
