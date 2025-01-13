import 'reflect-metadata'
import { ISerializacao } from '../models/ISerializacao'
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'

interface IRequest{

    id: number
}

export default class ClienteIdService{

    public async execute({id}: IRequest): Promise<Cliente | ISerializacao | string>{

        const cliente = await ClienteRepository.findById(id);

        if(!cliente){

            return ('Cliente não encontrado');
        }

        const serializacao = {
    
            id: cliente.id,
            nome: cliente.nome_cliente,
            email: cliente.email,
            endereco: {
                logradouro: cliente.logradouro,
                endereco: cliente.endereco,
                cep: cliente.cep,
                numero: cliente.numero_endereco
            }
        }

        return serializacao
    }
}
