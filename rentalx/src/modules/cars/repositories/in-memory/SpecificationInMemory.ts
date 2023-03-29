import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '@modules/cars/repositories/ISpecificationRepository';

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { description, name });
    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specifications) =>
      ids.includes(specifications.id)
    );

    return allSpecifications;
  }
}
