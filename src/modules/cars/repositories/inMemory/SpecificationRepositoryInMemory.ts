import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';


class SpecificationRepositoryInMemory implements ISpecificationRepository {
    private specifications: Specification[] = []
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, {
            name,
            description
        });
        this.specifications.push(specification);
        return specification;
    }
    async list(): Promise<Specification[]> {
        const allSpecifications = this.specifications;
        return allSpecifications;
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find((specification) => specification.name === name);
        return specification;
    }
    async findbyIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );
        return specifications
    }
}

export { SpecificationRepositoryInMemory }