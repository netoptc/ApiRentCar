import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { AppError } from "../../../../errors/AppErros";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExist =
            await this.specificationRepository.findByName(name);
        if (specificationAlreadyExist) {
            throw new AppError("Specification already exist");
        }
        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
