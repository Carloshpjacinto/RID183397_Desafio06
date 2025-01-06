import { Request, Response } from "express";
import CriandoVendaServece from "../services/CriandoVendasServeces";

export default class VendaController{

    public async create(req:Request, res:Response): Promise<void>{

        const {cod_venda, desconto_produto, valor_venda, qtd_pedido} = req.body;

        const criandoVenda = new CriandoVendaServece();

        const venda = criandoVenda.execute({

            cod_venda,
            desconto_produto,
            valor_venda,
            qtd_pedido
        })

        res.status(201).json(venda)
    }
}
