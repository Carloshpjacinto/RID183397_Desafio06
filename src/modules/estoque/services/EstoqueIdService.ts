import 'reflect-metadata'
import { Estoque } from '../entities/Estoque'
import { EstoqueRepository } from '../repositories/EstoqueRepository'

interface IRequest{

    id: number
}

export default class EstoqueIdService{

    public async execute({id}: IRequest): Promise<Estoque | Error>{

        const estoque = await EstoqueRepository.findById(id);

        if(!estoque){

            return new Error('Cliente não encontrado');
        }

        return estoque
    }
}
