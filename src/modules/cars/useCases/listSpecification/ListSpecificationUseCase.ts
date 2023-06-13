import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { Specification } from "../../entities/Specification";

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Specification[]>  {
        const specifications = await this.specificationRepository.list()
        return specifications;
    }
};

export { ListSpecificationUseCase }