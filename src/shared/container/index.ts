import { container } from "tsyringe";

import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/CarImageRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarRepository>(
    "CarRepository",
    CarRepository
);


container.registerSingleton<ICarImageRepository>(
    "CarImageRepository",
    CarImageRepository
);