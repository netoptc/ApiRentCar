import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppErros";
import { ICreateUserDTO, IUserRepository } from "@modules/accounts/repositories/IUserRepository";


@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    
    async execute({
        name,
        password,
        email,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        
        const userAlreadyExist = await this.userRepository.findByEmail(email);
        if (userAlreadyExist) {
            throw new AppError('User Already exist');
        }

        const passwordHash = await hash(password, 8)
        
        await this.userRepository.create({ 
            name,
            password: passwordHash,
            email,
            driver_license
        });
    }
}

export { CreateUserUseCase }