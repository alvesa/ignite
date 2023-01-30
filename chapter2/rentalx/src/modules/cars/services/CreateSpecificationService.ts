import { ISpecificationRepository } from '../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
export class CreateSpecificationService {
  constructor(
    private readonly specificationsRepository: ISpecificationRepository
  ) {}
  execute({ description, name }: IRequest): void {
    // const specificationAlreadyExists =
    //   this.specificationsRepository.findByName(name);

    // if (specificationAlreadyExists)
    //   throw new Error(`Specification ${name} already exists`);

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
