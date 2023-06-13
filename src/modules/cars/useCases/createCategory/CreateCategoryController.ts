import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCateogryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        try {
            await createCategoryUseCase.execute({ name, description });
        } catch (error) {
            return response.status(500).send();    
        }
        return response.status(201).send();
    }
}

export { CreateCateogryController };
