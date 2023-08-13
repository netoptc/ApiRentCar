import "reflect-metadata"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppErros";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;


describe("Create Car Specification", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    });

    it("should be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({car_id, specifications_id})

        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
    
        const specification1 = await specificationRepositoryInMemory.create({
            name: 'My Specification 1',
            description: 'description my specification 1',
        });


        const specification2 = await specificationRepositoryInMemory.create({
            name: 'My Specification 2',
            description: 'description my specification 2',
        })

        const car = await carRepositoryInMemory.create({
            name: 'car name',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })
        
        const updateCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [
                specification1.id,
                specification2.id,
            ]
        });

        expect(updateCar).toHaveProperty("specifications");
        expect(updateCar.specifications.length).toBe(2);
    });
})