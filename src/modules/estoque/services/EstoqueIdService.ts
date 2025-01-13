import 'reflect-metadata'
import { IId } from '../models/IId';
import { Estoque } from '../entities/Estoque'
import { EstoqueRepository } from '../repositories/EstoqueRepository'

export default class EstoqueIdService{

    public async execute({id}: IId): Promise<Estoque | string>{

        const estoque = await EstoqueRepository.findById(id);

        if(!estoque){

            return ('Estoque não encontrado');
        }

        return estoque
    }
}
