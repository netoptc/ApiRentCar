import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/CreateRentalController";

import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", authenticatedMiddleware, createRentalController.handle);

export { rentalsRoutes };
