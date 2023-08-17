import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "../entities/Rental";
import { Repository, getRepository } from "typeorm";

class RentalRepository implements IRentalRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({ car_id, user_id, expected_return_date }: { car_id: any; user_id: any; expected_return_date: any; }): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date
        })
        await this.repository.save(rental);
        return rental
    }
    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ car_id, end_date: null})
        return rental;
    }

    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ user_id, end_date: null})
        return rental;
    }

}

export { RentalRepository }