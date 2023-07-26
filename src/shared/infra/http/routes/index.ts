import { Router } from "express";

import { categoriesRoutes } from "@shared/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@shared/infra/http/routes/specifications.routes";
import { usersRouter } from "@shared/infra/http/routes/users.routes";
import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { carRouter } from "./car.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRouter);
router.use("/cars", carRouter);
router.use(authenticateRoutes);

export { router };
