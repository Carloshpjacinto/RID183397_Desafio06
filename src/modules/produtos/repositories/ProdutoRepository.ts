import { AppDataSource } from "../../../typeorm/data-source";
import { Produto } from "../entities/Produtos";

export const ProdutoRepository = AppDataSource.getRepository(Produto).extend({

    async findById(id: number): Promise<Produto | null>{

        return this.findOneBy({ id });
    }
});
