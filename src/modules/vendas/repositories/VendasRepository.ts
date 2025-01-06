import { AppDataSource } from "../../../typeorm/data-source";
import { Venda } from "../entities/Vendas"

export const ClienteRepository = AppDataSource.getRepository(Venda).extend({

    async findById(id: number): Promise<Venda | null>{

        return this.findOneBy({ id })
    }
})
