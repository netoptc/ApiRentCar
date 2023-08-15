import { Rental } from "../infra/entities/Rental"

interface ICreateRental {
    car_id: string,
    user_id: string,
    expected_return_date: Date,
}

interface IRentalRepository {
    create({car_id, user_id, expected_return_date}): Promise<Rental>
    findOpenRentalByCarId(car_id: string): Promise<Rental>
    findOpenRentalByUserId(user_id: string): Promise<Rental>
}


export { IRentalRepository, ICreateRental }