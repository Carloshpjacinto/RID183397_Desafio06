import 'reflect-metadata'
import { IId } from '../models/IId';
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'

export default class PedidoIdService{

    public async execute({id}: IId): Promise<Pedido | string>{

        const pedido = await PedidoRepository.findById(id);

        if(!pedido){

            return ('Pedido não encontrado');
        }

        return pedido
    }
}
