import { inject, injectable } from "tsyringe";

import { ICreateUserDTO, IUserRepository } from "../../repositories/IUserRepository";
import { hash } from "bcrypt";

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
            throw new Error('User Already exist')
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