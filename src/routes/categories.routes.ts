import { Router } from "express";
import multer from "multer";

import { CreateCateogryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategory/ListCategoryController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCateogryController = new CreateCateogryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post("/", createCateogryController.handle);
categoriesRoutes.get("/", listCategoryController.handle);
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };
