import request from "supertest";
import { v4 as uuidV4 } from "uuid"
import { hash } from "bcrypt";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection

describe("Create Category controller", () => {
    
    beforeAll(async () => {
        connection = await createConnection();
        
        await connection.runMigrations();
        
        const id = uuidV4();
        const password = await hash("admin",8)
     
        await connection.query(`
             INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
             VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `)     
    })

    afterAll( async () => {
        await connection.dropDatabase();
        await connection.close()
    })
    
    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { token } = responseToken.body

        const response = await request(app)
            .post("/categories")
            .set({
                Authorization: `Bearer ${token}` 
            })
            .send({
                name: "Category supertest",
                description: "Category description supertest"
            })

        expect(response.status).toBe(201);
    })
})