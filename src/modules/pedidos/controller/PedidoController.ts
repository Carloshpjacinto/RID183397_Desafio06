import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";

export default class PedidoController{

    public async create(req:Request, res:Response): Promise<void>{

        const {cod_pedido} = req.body;

        const criandoPedido = new CriandoPedidoServece();

        const pedido = criandoPedido.execute({

            cod_pedido
        })

        res.status(201).json(pedido)
    }
}
