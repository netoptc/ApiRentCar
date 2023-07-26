import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

class CarRepository implements ICarRepository{
    private repository: Repository<Car>
    
    constructor () {
        this.repository = getRepository(Car)
    }
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            category_id
        });
        
        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })

        return car;
    }

}

export { CarRepository }