import { Request, Response } from "express";
import ListaClienteService from "../services/ListaClienteService";
import CriandoClienteService from "../services/CriandoClienteService";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { hash } from "bcrypt";
import ClienteIdService from "../services/ClienteIdService";

export default class ClienteController{

    public async index(req: Request, res: Response): Promise<Response>{

        try{
            const listaCliente = new ListaClienteService()

            const clientes = await listaCliente.execute();

            const listaSerializacao = clientes.map((cliente) => ({

                nome: cliente.nome_cliente,
                email: cliente.email,
                endereco: {
                    logradouro: cliente.logradouro,
                    endereco: cliente.endereco,
                    cep: cliente.cep,
                    numero: cliente.numero_endereco
                }
            }
        ))
    
            return res.json(listaSerializacao)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }

    }

    public async show(req: Request, res: Response): Promise<Response>{

        try{
            const { id } = req.params;

            const idNumber = Number(id)

            const clienteRepository = await ClienteRepository.findOne({where: {id: idNumber}})

            if(!clienteRepository){

                return res.json({mensagem: "O cliente não foi encontrado"})
            }

            const serializacao = {
    
                nome: clienteRepository.nome_cliente,
                email: clienteRepository.email,
                endereco: {
                    logradouro: clienteRepository.logradouro,
                    endereco: clienteRepository.endereco,
                    cep: clienteRepository.cep,
                    numero: clienteRepository.numero_endereco
                }
            }
    
            const clienteIdService = new ClienteIdService()
    
            await clienteIdService.execute({id: idNumber})
    
            return res.json(serializacao)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {nome_cliente, email, senha, logradouro, endereco, cep, numero_endereco} = req.body;

            const criandoCliente = new CriandoClienteService();
    
            const cliente = await criandoCliente.execute({
    
                nome_cliente,
                email,
                senha,
                logradouro,
                endereco,
                cep,
                numero_endereco
            })
    
            return res.status(201).json(cliente)

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }
}
