import { Request, Response } from "express";
import CriandoEstoqueServece from "../services/CriandoEstoqueService";

export default class EstoqueController{

    public async create(req:Request, res:Response): Promise<Response>{

        const {qtd_estoque} = req.body;

        const criandoEstoue = new CriandoEstoqueServece();

        const estoque = await criandoEstoue.execute({

            qtd_estoque
        })

        return res.status(201).json({mensagem: `Estoque de id: ${estoque.id} criado com sucesso`})
    }
}
