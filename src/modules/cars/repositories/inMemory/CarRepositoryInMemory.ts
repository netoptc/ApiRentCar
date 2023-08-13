import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarRepository } from "../ICarRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

export class CarRepositoryInMemory implements ICarRepository {
    private cars: Car[] = [];
    
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications }: ICreateCarDTO): Promise<Car> {
        const car = new Car()
        
        Object.assign(car, {
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            category_id,
            specifications,
        })
        this.cars.push(car);
        
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {        
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        let cars = this.cars.filter((car) => car.available === true);
    
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
        return this.cars.find((car) => car.id === id);
    }

}