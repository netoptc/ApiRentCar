import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "@modules/cars/useCases/listCategory/ListCategoryUseCase";

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase)
        const all = await listCategoryUseCase.execute();
        return response.json(all).send();
    }
}
export { ListCategoryController };
