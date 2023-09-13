import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { ICreateUserDTO, IUserRepository };
