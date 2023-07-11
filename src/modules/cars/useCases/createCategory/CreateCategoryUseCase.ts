import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppErros";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoryRepository.findByName(
            name
        );
        if (categoryAlreadyExist) {
            throw new AppError("Category already exist");
        }
        this.categoryRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
