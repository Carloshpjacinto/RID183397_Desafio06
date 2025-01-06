import { Request, Response } from "express";
import CriandoProdutoServece from "../services/CriandoProdutoService";

export default class ProdutoController{

    public async create(req:Request, res:Response): Promise<Response>{

        const {nome_produto, categoria, preco} = req.body;

        const criandoProduto = new CriandoProdutoServece();

        const produto = await criandoProduto.execute({

            nome_produto,
            categoria,
            preco
        })

        return res.status(201).json(produto)
    }
}
