import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

type IRequest = {
    category_id?: string,
    brand?: string,
    name?: string
}

class ListCarsUseCase {
    constructor(
        private carRepository: ICarRepository
    ) {}
    
    async execute({category_id, brand, name}: IRequest): Promise<Car[]> {
        const cars = await this.carRepository.findAvailable(category_id, brand, name)
        return cars
    }
}


export { ListCarsUseCase }