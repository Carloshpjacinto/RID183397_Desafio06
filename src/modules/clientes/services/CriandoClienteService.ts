import 'reflect-metadata'
import { IcriandoCliente } from '../models/ICriandoCliente';
import { ISerializacao } from '../models/ISerializacao';
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'
import { hash } from 'bcrypt';

export default class CriandoClienteService{

    async execute({ nome_cliente, email, senha, logradouro, endereco, cep, numero_endereco}: IcriandoCliente): Promise<Cliente | ISerializacao | string>{

        const clienteRepository = await ClienteRepository.findOne({where: {email: email}})

        if(clienteRepository){

            return ("O email já está cadastrado")
        }

        const hashedPassword = await hash(senha, 10)

        const cliente:Cliente = ClienteRepository.create({

            nome_cliente,
            email,
            senha: hashedPassword,
            logradouro,
            endereco,
            cep,
            numero_endereco
        })

        const serializacao:ISerializacao = {
    
            id: cliente.id,
            nome: nome_cliente,
            email: email,
            endereco: {
                logradouro: logradouro,
                endereco: endereco,
                cep: cep,
                numero: numero_endereco
            }
        }

        await ClienteRepository.save(cliente)

        return serializacao
    }
}
