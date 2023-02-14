import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private readonly specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new AppError(`Specification ${name} already exists`);

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}
