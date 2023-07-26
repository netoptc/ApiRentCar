import { CreateCarControler } from "@modules/cars/useCases/createCar/CreateCarControler";
import { Router } from "express";

const carRouter = Router()

const createCarControler = new CreateCarControler()

carRouter.post("/",createCarControler.handle);

export { carRouter }