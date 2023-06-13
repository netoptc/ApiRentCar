import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";


@injectable()
class ListCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private cateogryReository: ICategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.cateogryReository.list();
        return categories;
    }
}
export { ListCategoryUseCase };
