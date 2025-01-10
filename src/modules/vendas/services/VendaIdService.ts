import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { VendasRepository } from '../repositories/VendasRepository'

interface IRequest{

    id: number
}

export default class VendaIdService{

    public async execute({id}: IRequest): Promise<Venda | Error>{

        const venda = await VendasRepository.findById(id);

        if(!venda){

            return new Error('Produto não encontrado');
        }

        return venda
    }
}
