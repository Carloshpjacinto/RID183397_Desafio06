import 'reflect-metadata'
import { IEstoque } from '../models/IEstoques';
import { Estoque } from '../entities/Estoque'
import { EstoqueRepository } from '../repositories/EstoqueRepository'

export default class ListaClienteService{

    public async execute(): Promise<IEstoque[] | Estoque>{

        const estoques = await EstoqueRepository.find();

        const listaEstoque:IEstoque[] = estoques.map((estoque) => ({

            id: estoque.id,
            quantidade: estoque.qtd_estoque
        }))

        return listaEstoque
    }
}
