import 'reflect-metadata'
import { Produto } from '../entities/Produtos'
import { ProdutoRepository } from '../repositories/ProdutoRepository'

interface IRequest{

    id: number
}

export default class ProdutoIdService{

    public async execute({id}: IRequest): Promise<Produto | Error>{

        const produto = await ProdutoRepository.findById(id);

        if(!produto){

            return new Error('Produto não encontrado');
        }

        return produto
    }
}
