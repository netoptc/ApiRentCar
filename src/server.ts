import "reflect-metadata";

import express from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorMiddleware);

app.listen(3333, () => console.log("serve is running"));
