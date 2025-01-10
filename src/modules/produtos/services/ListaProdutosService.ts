import 'reflect-metadata'
import { Produto } from '../entities/Produtos'
import { ProdutoRepository } from '../repositories/ProdutoRepository'

export default class ListaProdutosService{

    public async execute(): Promise<Produto[]>{

        const produtos = ProdutoRepository.find();

        return produtos
    }
}
