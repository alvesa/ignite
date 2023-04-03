import { inject, injectable } from 'tsyringe';

import { CarsImagesRepository } from '../../infra/typeorm/repositories/CarsImagesRepository';

interface IRequest {
  card_id: string;
  images_name: string[];
}
@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository
  ) {}
  async execute({ card_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(card_id, image);
    });
  }
}
