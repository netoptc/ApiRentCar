import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppErros";

interface IRequest{
    email: string,
    password: string,
}
interface IResponse {
    user: {
        name: string,
        email: string,
    },
    token: string,
}


@injectable()
class AuthenticateUserUseCase { 
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute({email, password}: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        const token = sign({}, 'a621282f4d01b474716eedd7c94a14d6', {
            subject: user.id,
            expiresIn: '1d'
        });
        
        const tokenResponse = {
            user: { 
                name: user.name,
                email: user.email,
            },
            token
        }
        
        return tokenResponse;

    }
}

export { AuthenticateUserUseCase };  