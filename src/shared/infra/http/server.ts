import "reflect-metadata";

import express from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import swaggerFile from "../../../swagger.json";
import "@shared/infra/typeorm";
import "@shared/container";

import { router } from "./routes";
import { errorMiddleware } from "@shared/infra/http/middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorMiddleware);

app.listen(3333, () => console.log("serve is running"));
