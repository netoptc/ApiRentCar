import { AppError } from "../../../../errors/AppErros";
import { CategoryRepositoryInMemory } from "../../repositories/inMemory/CategoryRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCateogryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        createCateogryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
    });
    
    it("should be able to create a new category", async () => {   
        const cateogry = {
            name: "Name category test",
            description: "Description cateogry test",
        }
        
        await createCateogryUseCase.execute(cateogry);

        const categoryCreated = await categoryRepositoryInMemory.findByName(
            cateogry.name
        )

        expect(categoryCreated).toHaveProperty("id"); 
    })

    it("should not be able to create a new category with name exist", async () => {   
        expect(async() => {
            const cateogry = {
                name: "Name category test",
                description: "Description cateogry test",
            }
            
            await createCateogryUseCase.execute(cateogry);
        
            await createCateogryUseCase.execute(cateogry);
        }).rejects.toBeInstanceOf(AppError);
    })
})