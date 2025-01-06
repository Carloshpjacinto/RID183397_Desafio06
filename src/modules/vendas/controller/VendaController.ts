import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";

export default class VendaController{

    public async create(req:Request, res:Response): Promise<Response>{

        const {cod_venda, desconto_produto, valor_venda, qtd_pedido} = req.body;

        const criandoVenda = new CriandoVendaServece();

        const venda = await criandoVenda.execute({

            cod_venda,
            desconto_produto,
            valor_venda,
            qtd_pedido
        })

        return res.status(201).json(venda)
    }
}
