import 'reflect-metadata'
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'

interface IcriandoPedido{

    cod_pedido: number;

}

export default class CriandoPedidoServece{

    async execute({cod_pedido}: IcriandoPedido): Promise<Pedido>{

        const pedido = PedidoRepository.create({

            cod_pedido
        })

        await PedidoRepository.save(pedido)

        return pedido
    }
}
