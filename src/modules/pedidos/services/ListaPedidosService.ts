import 'reflect-metadata'
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'

export default class ListaPedidosService{

    public async execute(): Promise<Pedido[]>{

        const pedido = PedidoRepository.find();

        return pedido
    }
}
