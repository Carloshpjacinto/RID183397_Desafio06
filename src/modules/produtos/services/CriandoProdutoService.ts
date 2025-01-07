import 'reflect-metadata'
import { Produto } from '../entities/Produtos'
import { ProdutoRepository } from '../repositories/ProdutoRepository'
import { Estoque } from '../../estoque/entities/Estoque'
import { EstoqueRepository } from '../../estoque/repositories/EstoqueRepository';

interface IcriandoProduto{

    nome_produto: string;
    categoria: string;
    preco: number;
    id_estoque:number
}

export default class CriandoProdutoServece{

    async execute({ nome_produto, categoria, preco, id_estoque}: IcriandoProduto): Promise<Produto>{

        const estoque = await EstoqueRepository.findOneBy({id: id_estoque})

        if (!estoque) {
            throw new Error("Estoque não encontrado");
        }

        const produto = ProdutoRepository.create({

            nome_produto,
            categoria,
            preco,
            estoque
        })

        await ProdutoRepository.save(produto)

        return produto
    }
}
