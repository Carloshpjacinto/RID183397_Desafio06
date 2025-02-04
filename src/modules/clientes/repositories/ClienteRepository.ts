import { injectable } from "tsyringe";
import { AppDataSource } from "../../../typeorm/data-source";
import { Cliente } from "../entities/Clientes";

export const ClienteRepository = AppDataSource.getRepository(Cliente).extend({

    async findById(id: number): Promise<Cliente | null>{

        return this.findOneBy({ id });
    },

    async findByEmail(email:string): Promise<Cliente | null>{

        return await this.findOne({where: {email}});
    }
});
