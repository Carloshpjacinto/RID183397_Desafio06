import 'reflect-metadata';
import { Produto } from "../entities/Produtos";
import { IcriandoProduto } from "../models/ICriandoProduto";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { EstoqueRepository } from "../../estoque/repositories/EstoqueRepository";

export default class CriandoProdutoServece{

    async execute({ nome_produto, categoria, preco, desconto, id_estoque}: IcriandoProduto): Promise<Produto | string>{

        const estoque = await EstoqueRepository.findOne({where: {id: id_estoque}});

        const produtoVerificacao = await ProdutoRepository.findOne({where: {estoque: {id: id_estoque}}, relations: ["estoque"] });

        const produtoVerificaNome = await ProdutoRepository.findOne({where: {nome_produto: nome_produto}});

        if(!estoque){
                    
            return ("Estoque não encontrado");
        }

        if(produtoVerificacao){

            return ("Já existe um produto com esse id estoque associado");
        }

        if(produtoVerificaNome){

            return ("Já existe um produto com esse nome cadastrado");
        }

        const produto = ProdutoRepository.create({

            nome_produto,
            categoria,
            preco,
            desconto,
            estoque
        })

        await ProdutoRepository.save(produto);

        return produto;
    };
};
