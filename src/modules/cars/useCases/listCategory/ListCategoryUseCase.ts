import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

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
