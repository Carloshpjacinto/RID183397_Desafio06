import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";
import { PedidoRepository } from "../../pedidos/repositories/PedidoRepository";
import { ProdutoRepository } from "../../produtos/repositories/ProdutoRepository";
import ListaVendasService from "../services/ListaVendasService";
import VendaIdService from "../services/VendaIdService";

export default class VendaController{

    public async index(req: Request, res: Response): Promise<Response>{
                
        try{
            const listaVendas = new ListaVendasService()
                
            const vendas = await listaVendas.execute();
                    
            return res.json(vendas)
                
        } catch(error){
                
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async show(req: Request, res: Response): Promise<Response>{
                
        try{
            const { id } = req.params;
                
            const idNumber = Number(id)
                    
            const vendaIdService = new VendaIdService()
                    
            const venda = await vendaIdService.execute({id: idNumber})
                    
            return res.json({venda})
                
        } catch(error){
                
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response | string>{

        try{
            const {id_pedido} = req.body;

            const codVenda = Math.floor(Math.random() * 99999);

            const pedido = await PedidoRepository.findOne({where: {id: id_pedido}, relations: ["produto", "cliente"],})

            if(!pedido){
                    
                return ('O pedido não foi encontrado')
            }

            const produto = await ProdutoRepository.findOne({where: {id: pedido.produto.id}, relations: ["estoque"]})
            
            if(!produto){
                        
                return ("Produto não encontrado")
            }

            const preco = produto.preco
            
            const desconto = produto.desconto
            
            const desconto_replace = desconto.replace('%', '')
            const desconto_numero = Number(desconto_replace)
    
            let valorFinalVenda = 0
    
            if(desconto_numero != 0){
    
                valorFinalVenda = ((preco - (preco * (desconto_numero / 100))) * pedido.qtd_produto_pedido)
    
            }else{
    
                valorFinalVenda = (preco * pedido.qtd_produto_pedido)
            }    
    
            const criandoVenda = new CriandoVendaServece();
    
            const venda = await criandoVenda.execute({
    
                cod_venda: codVenda,
                valor_venda: valorFinalVenda,
                id_pedido
            })
    
            return res.status(201).json({venda})

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
