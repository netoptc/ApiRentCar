import { User } from "../entities/User";

interface ICreateUserDTO {
    name: string,
    password: string,
    email: string,
    driver_license: string,
}

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { ICreateUserDTO, IUserRepository}