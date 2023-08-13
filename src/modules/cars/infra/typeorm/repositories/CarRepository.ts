import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

class CarRepository implements ICarRepository{
    private repository: Repository<Car>
    
    constructor () {
        this.repository = getRepository(Car)
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            category_id,
            specifications,
            id
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

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        let cars = await this.repository.find({
            available: true
        })

        if (category_id) {
            cars = cars.filter((car) => car.category_id === category_id);
        }
        if (brand) {
            cars = cars.filter((car) => car.brand === brand);
        }
        if (name) {
            cars = cars = name && cars.filter((car) => car.name === name);
        }

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }

}

export { CarRepository }