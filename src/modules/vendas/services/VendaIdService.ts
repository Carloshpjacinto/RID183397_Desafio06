import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { IId } from '../models/IId';
import { VendasRepository } from '../repositories/VendasRepository'

export default class VendaIdService{

    public async execute({id}: IId): Promise<Venda | string>{

        const venda = await VendasRepository.findOne({where: {id: id}, relations: ["pedido"]});

        if(!venda){

            return ('Produto não encontrado');
        }

        return venda
    }
}
