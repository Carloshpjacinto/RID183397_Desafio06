import { Request, Response } from "express";
import CriandoProdutoServece from "../services/CriandoProdutoService";
import { EstoqueRepository } from "../../estoque/repositories/EstoqueRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export default class ProdutoController{

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {nome_produto, categoria, preco, desconto, id_estoque} = req.body;

            const estoque = await EstoqueRepository.findOne({where: {id: id_estoque}})

            const produtoVerificacao = await ProdutoRepository.findOne({where: {estoque: {id: id_estoque}}, relations: ["estoque"] })

            const produtoVerificaNome = await ProdutoRepository.findOne({where: {nome_produto: nome_produto}})

            if(produtoVerificacao){

                return res.json({mensagem: "Já existe um produto com esse id estoque associado"})
            }

            if(produtoVerificaNome){

                return res.json({mensagem: "Já existe um produto com esse nome cadastrado"})
            }
                
            if(!estoque){
                        
                return res.json({mensagem: "Estoque não encontrado"})
            }
    
            const criandoProduto = new CriandoProdutoServece();
    
            const produto = await criandoProduto.execute({
    
                nome_produto,
                categoria,
                preco,
                desconto,
                id_estoque
            })
    
            return res.status(201).json(produto)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
