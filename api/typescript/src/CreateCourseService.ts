interface Course {
  name: string;
  duration?: number;
  educator: string
}

export class CreateCourseService {
  execute(data: Course) {
    console.log({ ...data });
  }
}

export default new CreateCourseService();