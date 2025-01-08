import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";

export default class VendaController{

    public async create(req:Request, res:Response): Promise<Response>{

        const codVenda = Math.floor(Math.random() * 99999);

        //const desconto_replace = desconto.replace('%', '')
        
        //const desconto_numero = Number(desconto_replace)

        const {valor_venda, id_pedido} = req.body;

        const criandoVenda = new CriandoVendaServece();

        const venda = await criandoVenda.execute({

            cod_venda: codVenda,
            valor_venda,
            id_pedido
        })

        return res.status(201).json(venda)
    }
}
