import { Category } from "@modules/cars/infra/typeorm/entities/Category";

interface ICreateReposirotyDTO {
    name: string;
    description: string;
}

interface ICategoryRepository {
    create({ name, description }: ICreateReposirotyDTO): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
}

export { ICategoryRepository, ICreateReposirotyDTO };
