import { AppError } from "@shared/errors/AppErros";
import { ICreateRental, IRentalRepository } from "../repositories/IRentalRepository";

class CreateRentalUseCase {
    constructor(
        private rentalRepository: IRentalRepository
    ) {}
    
    async execute({
        car_id,
        user_id, 
        expected_return_date 
    }: ICreateRental) {
       
        const carUnavailable =  await this.rentalRepository.findOpenRentalByCarId(car_id);
       if (carUnavailable) {
        throw new AppError('Car is unavailable');
       }

       const rentalOpenToUser =  await this.rentalRepository.findOpenRentalByUserId(user_id);
       if (rentalOpenToUser) {
        throw new AppError('Already exist a rental to this user');
       }

       const rental = await this.rentalRepository.create({car_id, user_id, expected_return_date});
       return rental;
    }
}

export { CreateRentalUseCase } 