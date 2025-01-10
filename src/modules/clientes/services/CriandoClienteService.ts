import 'reflect-metadata'
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'

interface IcriandoCliente{

    nome_cliente: string;
    email: string;
    senha: string;
    logradouro: string;
    endereco: string;
    cep: string;
    numero_endereco: number
}

export default class CriandoClienteService{

    async execute({ nome_cliente, email, senha, logradouro, endereco, cep, numero_endereco}: IcriandoCliente): Promise<Cliente>{

        const cliente = ClienteRepository.create({

            nome_cliente,
            email,
            senha,
            logradouro,
            endereco,
            cep,
            numero_endereco
        })

        await ClienteRepository.save(cliente)

        return cliente
    }
}
