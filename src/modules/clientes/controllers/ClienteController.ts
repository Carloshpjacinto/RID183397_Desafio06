import { Request, Response } from "express";
import CriandoClienteServece from "../services/CriandoClienteServece";

export default class ClienteController{

    public async create(req:Request, res:Response): Promise<void>{

        const {nome_cliente, email, senha, logradouro, endereco, cep, numero_endereco} = req.body;

        const criandoCliente = new CriandoClienteServece();

        const cliente = criandoCliente.execute({

            nome_cliente,
            email,
            senha,
            logradouro,
            endereco,
            cep,
            numero_endereco
        })

        res.status(201).json(cliente)
    }
}
