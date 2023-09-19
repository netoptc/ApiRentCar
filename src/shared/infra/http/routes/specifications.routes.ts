import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecification/ListSpecificationController";
import { authenticatedMiddleware } from "@shared/infra/http/middlewares/authenticatedMiddleware";

import { userAdminMiddleware } from "../middlewares/userAdminMiddleware";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.use(authenticatedMiddleware);

specificationsRoutes.post(
  "/",
  userAdminMiddleware,
  createSpecificationController.handle
);
specificationsRoutes.get(
  "/",
  userAdminMiddleware,
  listSpecificationController.handle
);

export { specificationsRoutes };
