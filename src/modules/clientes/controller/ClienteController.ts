import { Request, Response } from "express";
import CriandoClienteServece from "../services/CriandoClienteServece";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { hash } from "bcrypt";

export default class ClienteController{

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {nome_cliente, email, senha, logradouro, endereco, cep, numero_endereco} = req.body;

            const clienteRepository = await ClienteRepository.findOne({where: {email: email}})

            if(clienteRepository){

                return res.json({mensagem: "O email já está cadastrado"})
            }

            const criandoCliente = new CriandoClienteServece();
    
            const serializacao = {
    
                nome_cliente,
                email,
                endereco: {
                    logradouro,
                    endereco,
                    cep,
                    numero: numero_endereco
                }
            }

            const hashedPassword = await hash(senha, 10)
    
            await criandoCliente.execute({
    
                nome_cliente,
                email,
                senha: hashedPassword,
                logradouro,
                endereco,
                cep,
                numero_endereco
            })
    
            return res.status(201).json(serializacao)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
