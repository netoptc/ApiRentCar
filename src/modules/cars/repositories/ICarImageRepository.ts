import { CarImage } from "../infra/typeorm/entities/CarImage"

interface ICreateCarImageDTO {
    car_id: string
    image_name: string,
}


interface ICarImageRepository {
    create({car_id, image_name}: ICreateCarImageDTO): Promise<CarImage>
}

export { ICreateCarImageDTO, ICarImageRepository }