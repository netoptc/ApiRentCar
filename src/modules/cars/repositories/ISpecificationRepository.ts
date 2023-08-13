import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
    findbyIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationRepository, ICreateSpecificationDTO };
