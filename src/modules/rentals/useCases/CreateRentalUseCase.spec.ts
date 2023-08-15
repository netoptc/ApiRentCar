import { AppError } from "@shared/errors/AppErros";
import { RentalRepositoryInMemory } from "../repositories/inMemory/RentaRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

const today = new Date()
const tomorrowDay = new Date(today)
tomorrowDay.setDate(tomorrowDay.getDate() + 2)


describe("Create rental", () => {
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
    })
    
    it("should be able create a new rental", async () => {
        const car_id = '1234';
        const user_id = '1234';
        const expected_return_date = tomorrowDay;
        
        const rental = await createRentalUseCase.execute({
            car_id,
            user_id,
            expected_return_date,
        })

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date')
    });


    it("should not be able create a new rental if exist another open to the same car", () => {
        
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '1234',
                user_id: '321',
                expected_return_date: tomorrowDay,
            });
    
            await createRentalUseCase.execute({
                car_id: '1234',
                user_id: '123',
                expected_return_date: tomorrowDay,
            })
        }).rejects.toBeInstanceOf(AppError);
    });


    it("should not be able create a new rental if exist another open to the same user", () => {
        
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '1234',
                user_id: '123',
                expected_return_date: tomorrowDay,
            });
    
            await createRentalUseCase.execute({
                car_id: '4321',
                user_id: '123',
                expected_return_date: tomorrowDay,
            })
        }).rejects.toBeInstanceOf(AppError);
    });


    it("should not be able create a new rental with invalid time", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '1234',
                user_id: '123',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})