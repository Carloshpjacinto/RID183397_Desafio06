import 'reflect-metadata'
import { Estoque } from '../entities/Estoque'
import { EstoqueRepository } from '../repositories/EstoqueRepository'

export default class ListaClienteService{

    public async execute(): Promise<Estoque[]>{

        const estoque = EstoqueRepository.find();

        return estoque
    }
}
