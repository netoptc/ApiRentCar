import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    car_id: string,
    images_name: string[],
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarImageRepository")
        private imageCarRepository: ICarImageRepository
    ) {}

    async execute({car_id, images_name}: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.imageCarRepository.create({car_id, image_name: image});
        })
    }
}

export { UploadCarImagesUseCase }