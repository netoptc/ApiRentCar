import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarRepository {
    create({ 
        name, 
        description, 
        daily_rate,
        license_plate,
        fine_amount,
        brand, 
        category_id 
    }: ICreateCarDTO): Promise<Car>;

    findByLicensePlate(license_plate: string): Promise<Car>

    findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>
}

export { ICarRepository };
