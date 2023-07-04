import { AppError } from "../../../../errors/AppErros";
import { ICreateUserDTO } from "../../repositories/IUserRepository";
import { UserRepositoryInMemory } from "../../repositories/inMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: 'user name test',
            email: 'test@email.com',
            driver_license: '9999',
            password: '123456',
        }

        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'noexist@email',
                password: 'noexist',
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'user name test2',
                email: 'test2@email.com',
                driver_license: '9999',
                password: '123456',
            }
    
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'password incorrect',
            });
        }).rejects.toBeInstanceOf(AppError);
    })
}) 