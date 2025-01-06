import { AppDataSource } from "../../../typeorm/data-source";
import { Pedido } from "../entities/Pedidos"

export const ClienteRepository = AppDataSource.getRepository(Pedido).extend({

    async findById(id: number): Promise<Pedido | null>{

        return this.findOneBy({ id })
    }
})
