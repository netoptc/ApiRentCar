import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string,
    specifications_id: string[],
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarRepository")
        private carRepository: ICarRepository,
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({car_id, specifications_id}: IRequest ) {
        const car = await this.carRepository.findById(car_id);
        if (!car) {
            throw new AppError('Car does not exists!');
        }

        console.log(specifications_id);

        const specifications = await this.specificationRepository.findbyIds(specifications_id);
        car.specifications = specifications
        return await this.carRepository.create(car);
    } 
}

export { CreateCarSpecificationUseCase }