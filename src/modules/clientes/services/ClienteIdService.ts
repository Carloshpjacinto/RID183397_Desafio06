import 'reflect-metadata'
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'

interface IRequest{

    id: number
}

export default class ClienteIdService{

    public async execute({id}: IRequest): Promise<Cliente | Error>{

        const cliente = await ClienteRepository.findById(id);

        if(!cliente){

            return new Error('Cliente não encontrado');
        }

        return cliente
    }
}
