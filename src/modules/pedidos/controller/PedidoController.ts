import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";

export default class PedidoController{

    public async create(req:Request, res:Response): Promise<Response>{

        const {cod_pedido} = req.body;

        const criandoPedido = new CriandoPedidoServece();

        const pedido = await criandoPedido.execute({

            cod_pedido
        })

        return res.status(201).json(pedido)
    }
}
