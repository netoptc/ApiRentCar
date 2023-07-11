import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository, ICreateReposirotyDTO } from "@modules/cars/repositories/ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
    private categories: Category[] = []
    
    async create({ name, description }: ICreateReposirotyDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
        });
        this.categories.push(category);
    }
    async list(): Promise<Category[]> {
       return this.categories;
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}
export { CategoryRepositoryInMemory } 