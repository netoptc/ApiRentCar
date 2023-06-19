import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            name,
            password,
            email,
            driver_license
        } = request.body;

        const createCategoryUseCase = container.resolve(CreateUserUseCase);
        
        try {
            await createCategoryUseCase.execute({
                name,
                password,
                email,
                driver_license
            })
        } catch (error) {
            throw error;  
        }
        
        return response.status(201).send();
    }
}  

export { CreateUserController }