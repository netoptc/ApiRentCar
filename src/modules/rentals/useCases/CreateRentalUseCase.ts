import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

import { AppError } from "@shared/errors/AppErros";
import { ICreateRental, IRentalRepository } from "../repositories/IRentalRepository";

dayjs.extend(utc);

class CreateRentalUseCase {
    constructor(
        private rentalRepository: IRentalRepository
    ) {}
    
    async execute({
        car_id,
        user_id, 
        expected_return_date 
    }: ICreateRental) {
       
        const minimunHour = 24
    
        const carUnavailable =  await this.rentalRepository.findOpenRentalByCarId(car_id);
        if (carUnavailable) {
        throw new AppError('Car is unavailable');
        }

        const rentalOpenToUser =  await this.rentalRepository.findOpenRentalByUserId(user_id);
        if (rentalOpenToUser) {
        throw new AppError('Already exist a rental to this user');
        }

        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()
        const dateNowFormat = dayjs().utc().local().format() 

        const compare = dayjs(expectedReturnDateFormat).diff(dateNowFormat, "hours")

        if (compare <= minimunHour) {
            throw new AppError("Invalid return time");
        }

        const rental = await this.rentalRepository.create({car_id, user_id, expected_return_date});
        return rental;
    }
}

export { CreateRentalUseCase } 