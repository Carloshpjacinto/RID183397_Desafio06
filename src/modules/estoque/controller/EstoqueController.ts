import { Request, Response } from "express";
import CriandoEstoqueServece from "../services/CriandoEstoqueService";

export default class EstoqueController{

    public async create(req:Request, res:Response): Promise<void>{

        const {qtd_estoque} = req.body;

        const criandoEstoue = new CriandoEstoqueServece();

        const estoque = criandoEstoue.execute({

            qtd_estoque
        })

        res.status(201).json(estoque)
    }
}
