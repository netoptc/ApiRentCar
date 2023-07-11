import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateUserDTO {
    id?: string,
    name: string,
    password: string,
    email: string,
    driver_license: string,
    avatar?: string,
}

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { ICreateUserDTO, IUserRepository}