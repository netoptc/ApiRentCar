import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { AppError } from "../errors/AppErros";

interface IPayload {
    sub: string,
}

export async function authenticatedMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        throw new AppError("Token missing!", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "a621282f4d01b474716eedd7c94a14d6") as IPayload
        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);
        if(!user) {
            throw new AppError("User not exist!", 401);
        }
        request.user = {
            id: user_id,
        }

        return next();

    } catch {
        throw new AppError("Invalid Token!", 401);
    }
}