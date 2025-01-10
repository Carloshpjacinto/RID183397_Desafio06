import 'reflect-metadata'
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'

export default class ListaClienteService{

    public async execute(): Promise<Cliente[]>{

        const cliente = ClienteRepository.find();

        return cliente
    }
}
