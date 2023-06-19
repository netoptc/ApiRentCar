import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../modules/cars/useCases/listSpecification/ListSpecificationController";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.use(authenticatedMiddleware);

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
