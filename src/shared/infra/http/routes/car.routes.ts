import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import { userAdminMiddleware } from "../middlewares/userAdminMiddleware";
import { authenticatedMiddleware } from "../middlewares/authenticatedMiddleware";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { CreateCarControler } from "@modules/cars/useCases/createCar/CreateCarControler";

const carRouter = Router()
const upload = multer(uploadConfig.upload('./tmp/cars/'));

const createCarControler = new CreateCarControler();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

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

carRouter.post(
    "/images/:id",
    authenticatedMiddleware,
    userAdminMiddleware,
    upload.array("images"),
    uploadCarImagesController.handle
);


export { carRouter }