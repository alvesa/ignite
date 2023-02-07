import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../ISpecificationRepository';

export class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[] = [];
  create({ description, name }: ICreateSpecificationDTO): void {
    const specifiction = new Specification();

    if (this.findByName(name))
      throw new Error(`Specification "${name}" already exists`);

    Object.assign(specifiction, { description, name, createdAt: new Date() });

    this.specifications.push(specifiction);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specifiction) => specifiction.name === name
    );

    return specification;
  }
}
