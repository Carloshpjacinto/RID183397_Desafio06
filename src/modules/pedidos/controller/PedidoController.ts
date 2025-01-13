import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";
import ListaPedidosService from "../services/ListaPedidosService";
import PedidoIdService from "../services/PedidoIdService";

export default class PedidoController{

    public async index(req: Request, res: Response): Promise<Response>{
        
        try{
            const listaPedidos = new ListaPedidosService()
        
            const pedido = await listaPedidos.execute();
            
            return res.json({pedido})
        
        } catch(error){
        
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
        
    }

    public async show(req: Request, res: Response): Promise<Response>{
        
        try{
            const { id } = req.params;
        
            const idNumber = Number(id)
            
            const pedidoIdService = new PedidoIdService()
            
            const pedido = await pedidoIdService.execute({id: idNumber})
            
            return res.json({pedido})
        
        } catch(error){
        
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{

            const codPedido = Math.floor(Math.random() * 99999)

            const {qtd_produto_pedido, id_cliente, id_produto} = req.body;

            const criandoPedido = new CriandoPedidoServece();
    
            const pedido = await criandoPedido.execute({
    
                cod_pedido: codPedido,
                qtd_produto_pedido,
                id_cliente,
                id_produto
            })

            return res.status(201).json({pedido})

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
