import 'reflect-metadata'
import { IListaProdutos } from '../models/IListaProdutos';
import { Produto } from '../entities/Produtos'
import { ProdutoRepository } from '../repositories/ProdutoRepository'

export default class ListaProdutosService{

    public async execute(): Promise<IListaProdutos[] | Produto | string>{

        const produtos = await ProdutoRepository.find();

        if(!produtos){

            return ("Produtos não encontrados")
        }

        const listaSerializacao:IListaProdutos[] = produtos.map((produto) => ({

            id: produto.id,
            nome: produto.nome_produto,
            categoria: produto.categoria,
            preco: produto.preco,
            desconto: produto.desconto
        }))

        return listaSerializacao
    }
}
