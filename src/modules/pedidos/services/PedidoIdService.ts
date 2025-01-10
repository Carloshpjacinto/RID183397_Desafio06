import 'reflect-metadata'
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'

interface IRequest{

    id: number
}

export default class PedidoIdService{

    public async execute({id}: IRequest): Promise<Pedido | Error>{

        const pedido = await PedidoRepository.findById(id);

        if(!pedido){

            return new Error('Cliente não encontrado');
        }

        return pedido
    }
}
