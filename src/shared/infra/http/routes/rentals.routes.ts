import { CreateRentalController } from "@modules/rentals/useCases/CreateRentalController";
import { Router } from "express";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController()

rentalsRoutes.post("/", authenticatedMiddleware, createRentalController.handle);

export { rentalsRoutes }