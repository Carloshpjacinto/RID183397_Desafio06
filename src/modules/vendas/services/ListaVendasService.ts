import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { VendasRepository } from '../repositories/VendasRepository'

export default class ListaVendasService{

    public async execute(): Promise<Venda[]>{

        const vendas = VendasRepository.find();

        return vendas
    }
}
