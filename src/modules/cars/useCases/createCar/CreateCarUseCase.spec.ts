import { AppError } from "@shared/errors/AppErros";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
    });
    
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: 'car name',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })

        expect(car).toHaveProperty("id");
    }) 

    it("should be able to create a new car with exist license plane", async () => {
        expect(async() => {
            await createCarUseCase.execute({
                name: 'car1',
                description: 'license plane',
                daily_rate: 1,
                license_plate: 'ABC1234',
                fine_amount: 1,
                brand: 'brand',
                category_id: 'categoryid', 
            });
            await createCarUseCase.execute({
                name: 'car2',
                description: 'license plane',
                daily_rate: 1,
                license_plate: 'ABC1234',
                fine_amount: 1,
                brand: 'brand',
                category_id: 'categoryid', 
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: 'car available',
            description: 'license plane available',
            daily_rate: 1,
            license_plate: 'ABC1235',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        });

        expect(car.available).toBe(true)
        
    })
})