import { AppError } from "@shared/errors/AppErros";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICreateRental, IRentalRepository } from "../repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
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

        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if (compare <= minimunHour) {
            throw new AppError("Invalid return time");
        }

        const rental = await this.rentalRepository.create({car_id, user_id, expected_return_date});
        return rental;
    }
}

export { CreateRentalUseCase } 