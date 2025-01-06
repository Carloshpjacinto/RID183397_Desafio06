import { AppDataSource } from "../../../typeorm/data-source";
import { Estoque } from "../entities/Estoque"

export const EstoqueRepository = AppDataSource.getRepository(Estoque).extend({

    async findById(id: number): Promise<Estoque | null>{

        return this.findOneBy({ id })
    }
})
