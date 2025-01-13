import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";
import ListaVendasService from "../services/ListaVendasService";
import VendaIdService from "../services/VendaIdService";

export default class VendaController{

    public async index(req: Request, res: Response): Promise<Response>{
                
        try{
            const listaVendas = new ListaVendasService()
                
            const vendas = await listaVendas.execute();
                    
            return res.json({Vendas: vendas})
                
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
                    
            return res.json({Venda: venda})
                
        } catch(error){
                
            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response | string>{

        try{
            const {id_pedido} = req.body;
    
            const criandoVenda = new CriandoVendaServece();
    
            const venda = await criandoVenda.execute({
    
                id_pedido
            })
    
            return res.status(201).json({Venda: venda})

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
