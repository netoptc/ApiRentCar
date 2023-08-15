import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
    private rentals: Rental[] = []

    async create({ car_id, user_id, expected_return_date }: { car_id: any; user_id: any; expected_return_date: any; }): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        })
        this.rentals.push(rental)
        return rental;
    }
    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
        return rental;
    }
    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
        return rental;
    }
}

export { RentalRepositoryInMemory }