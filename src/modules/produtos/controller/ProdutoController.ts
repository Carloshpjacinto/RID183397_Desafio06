import { Request, Response } from "express";
import CriandoProdutoServece from "../services/CriandoProdutoService";

export default class ProdutoController{

    public async create(req:Request, res:Response): Promise<void>{

        const {nome_produto, categoria, preco} = req.body;

        const criandoProduto = new CriandoProdutoServece();

        const produto = criandoProduto.execute({

            nome_produto,
            categoria,
            preco
        })

        res.status(201).json(produto)
    }
}
