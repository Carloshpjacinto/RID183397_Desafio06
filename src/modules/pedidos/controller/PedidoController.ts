import { Request, Response } from "express";
import CriandoPedidoServece from "../services/CriandoPedidoServece";

export default class PedidoController{

    public async create(req:Request, res:Response): Promise<Response>{

        const codPedido = Math.floor(Math.random() * 99999)

        const {qtd_produto_pedido, id_cliente, id_produto} = req.body;

        const criandoPedido = new CriandoPedidoServece();

        const pedido = await criandoPedido.execute({

            cod_pedido: codPedido,
            qtd_produto_pedido,
            id_cliente,
            id_produto
        })

        return res.status(201).json(pedido)
    }
}
