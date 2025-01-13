import { Request, Response } from 'express';
import CriandoProdutoServece from "../services/CriandoProdutoService";
import ListaProdutosService from "../services/ListaProdutosService";
import ProdutoIdService from "../services/ProdutoIdService";

export default class ProdutoController{

    public async index(req: Request, res: Response): Promise<Response>{
            
        try{
            const listaProdutos = new ListaProdutosService();
            
            const produtos = await listaProdutos.execute();
                
            return res.json({Produtos: produtos});
            
        } catch(error){
            
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async show(req: Request, res: Response): Promise<Response>{
            
        try{
            const { id } = req.params;
            
            const idNumber = Number(id);
                
            const produtoIdService = new ProdutoIdService();
                
            const produto = await produtoIdService.execute({id: idNumber});
                
            return res.json({Produto: produto});
            
        } catch(error){
            
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {nome_produto, categoria, preco, desconto, id_estoque} = req.body;

            const criandoProduto = new CriandoProdutoServece();
    
            const produto = await criandoProduto.execute({
    
                nome_produto,
                categoria,
                preco,
                desconto,
                id_estoque
            })
    
            return res.status(201).json({Produto: produto});

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    };
};
