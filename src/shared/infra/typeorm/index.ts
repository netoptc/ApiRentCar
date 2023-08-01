import { Connection, createConnection, getConnectionOptions } from "typeorm";


interface IOptions {
    host: string;
}


export default async (host= 'database_ignite'): Promise<Connection> => {
    const defaultOtions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOtions, {
            host
        })
    )
}