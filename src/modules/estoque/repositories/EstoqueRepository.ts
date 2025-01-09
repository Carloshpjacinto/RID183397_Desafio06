import { AppDataSource } from "../../../typeorm/data-source";
import { Estoque } from "../entities/Estoque"

export const EstoqueRepository = AppDataSource.getRepository(Estoque).extend({

    async findById(id: number): Promise<Estoque | null>{

        return this.findOneBy({ id })
    },

    async atualizacaoEstoque(id: number, atulizacaoDados: Partial<Estoque>): Promise<Estoque | null>{

        const estoque = await this.findById(id)

        if(!estoque){

            return null
        }

        Object.assign(estoque, atulizacaoDados);
        await this.save(estoque)

        return estoque;
    }
})
