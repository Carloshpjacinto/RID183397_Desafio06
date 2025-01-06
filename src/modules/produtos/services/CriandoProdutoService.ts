import 'reflect-metadata'
import { Produto } from '../entities/Produtos'
import { ProdutoRepository } from '../repositories/ProdutoRepository'

interface IcriandoProduto{

    nome_produto: string;
    categoria: string;
    preco: number;
}

export default class CriandoProdutoServece{

    async execute({ nome_produto, categoria, preco}: IcriandoProduto): Promise<Produto>{

        const produto = ProdutoRepository.create({

            nome_produto,
            categoria,
            preco
        })

        await ProdutoRepository.save(produto)

        return produto
    }
}
