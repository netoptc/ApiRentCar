import { CreateCarControler } from "@modules/cars/useCases/createCar/CreateCarControler";
import { Router } from "express";
import { userAdminMiddleware } from "../middlewares/userAdminMiddleware";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";

const carRouter = Router()

const createCarControler = new CreateCarControler()

carRouter.post("/", authenticatedMiddleware, userAdminMiddleware, createCarControler.handle);

export { carRouter }