import { Request, Response } from 'express';
import ListaClienteService from "../services/ListaClienteService";
import CriandoClienteService from "../services/CriandoClienteService";
import ClienteIdService from "../services/ClienteIdService";
import { Role } from '../utils/EnumRole';

export default class ClienteController{

    public async index(req: Request, res: Response): Promise<Response>{

        try{
            const listaCliente = new ListaClienteService();

            const clientes = await listaCliente.execute();
    
            return res.json({Clientes: clientes});

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }

    }

    public async show(req: Request, res: Response): Promise<Response>{

        try{
            const { id } = req.params;

            const idNumber = Number(id);
    
            const clienteIdService = new ClienteIdService();
    
            const cliente = await clienteIdService.execute({id: idNumber});
    
            return res.json({Cliente: cliente});

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        }
    }

    public async create(req:Request, res:Response): Promise<Response>{

        try{
            const {nome_cliente, role, email, senha, logradouro, endereco, cep, numero_endereco} = req.body;

            const criandoCliente = new CriandoClienteService();
    
            const cliente = await criandoCliente.execute({
    
                nome_cliente,
                role: role ?? Role[1],
                email,
                senha,
                logradouro,
                endereco,
                cep,
                numero_endereco
            })
    
            return res.status(201).json({Cliente: cliente});

        } catch(error){

            console.error('Erro ao processar a venda:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor'});
        };
    };
};
