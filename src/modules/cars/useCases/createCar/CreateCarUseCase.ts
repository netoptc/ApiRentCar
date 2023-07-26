import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppErros";

interface IRequest {
    name: string,
    description: string,
    daily_rate: number,
    license_plate: string,
    fine_amount: number,
    brand: string,
    category_id: string, 
}


@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CategoryRepository")
        private carRepository: ICarRepository
    ) {}
    
    async execute({ 
        name, 
        description, 
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const licensePlateAlreadyExist = await this.carRepository.findByLicensePlate(license_plate);
        if (licensePlateAlreadyExist) {
            throw new AppError('License plate already exist');
        }

        return this.carRepository.create({
            name, 
            description, 
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        })
    }
}