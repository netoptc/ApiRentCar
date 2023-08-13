import { ICarImageRepository, ICreateCarImageDTO } from "@modules/cars/repositories/ICarImageRepository";
import { CarImage } from "../entities/CarImage";
import { Repository, getRepository } from "typeorm";

class CarImageRepository implements ICarImageRepository {
    
    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage);
    }
    
    
    async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        })

        await this.repository.save(carImage);
        return carImage;
    }
}

export {  CarImageRepository }