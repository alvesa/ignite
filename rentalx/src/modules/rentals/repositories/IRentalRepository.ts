import { ICreateRentalDTO } from '../dto/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
  create(data: ICreateRentalDTO);
}
