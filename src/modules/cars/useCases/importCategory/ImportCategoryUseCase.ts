import { parse } from "csv-parse";
import fs from "fs";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}
    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategories[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
            stream.pipe(parseFile);
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const existCategory = await this.categoryRepository.findByName(name);

            if (!existCategory) {
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
