import { Specification } from '../entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
export interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}
