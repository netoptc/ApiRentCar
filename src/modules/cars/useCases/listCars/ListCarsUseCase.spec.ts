import { CarRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase";


let carRepositoryInMemory: CarRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List cars", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory()
        listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory)
    })

    it("should be able list all available cars", async () => {
        const car = await carRepositoryInMemory.create({
            name: 'car name available',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })

        const listCars = await listCarsUseCase.execute({});

        expect(listCars).toEqual([car])
    })

    it("should be able list all available cars by name", async () => {
        const car = await carRepositoryInMemory.create({
            name: 'car name',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })

        const listCars = await listCarsUseCase.execute({name: car.name});

        expect(listCars).toEqual([car])
    })

    it("should be able list all available cars by brand", async () => {
        const car = await carRepositoryInMemory.create({
            name: 'car name',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })

        const listCars = await listCarsUseCase.execute({brand: car.brand});

        expect(listCars).toEqual([car])
    })

    it("should be able list all available cars by brand", async () => {
        const car = await carRepositoryInMemory.create({
            name: 'car name',
            description: 'car description',
            daily_rate: 1,
            license_plate: 'ABC1234',
            fine_amount: 1,
            brand: 'brand',
            category_id: 'categoryid', 
        })

        const listCars = await listCarsUseCase.execute({category_id: car.category_id});

        expect(listCars).toEqual([car])
    })
})