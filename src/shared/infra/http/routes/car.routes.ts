import { CreateCarControler } from "@modules/cars/useCases/createCar/CreateCarControler";
import { Router } from "express";
import { userAdminMiddleware } from "../middlewares/userAdminMiddleware";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carRouter = Router()

const createCarControler = new CreateCarControler()
const createCarSpecificationController = new CreateCarSpecificationController()

carRouter.post(
    "/", 
    authenticatedMiddleware,
    userAdminMiddleware, 
    createCarControler.handle
);

carRouter.post(
    "/specifications/:id",
    authenticatedMiddleware,
    userAdminMiddleware, 
    createCarSpecificationController.handle
);

export { carRouter }