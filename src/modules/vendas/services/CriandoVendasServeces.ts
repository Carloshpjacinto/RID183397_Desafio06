import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { VendasRepository } from '../repositories/VendasRepository'
import { PedidoRepository } from '../../pedidos/repositories/PedidoRepository';

interface Icriandovenda{

    cod_venda: number;
    valor_venda: number;
    id_pedido: number
}

export default class CriandoVendaServece{

    async execute({ cod_venda, valor_venda, id_pedido}: Icriandovenda): Promise<Venda>{

        const pedido = await PedidoRepository.findOneBy({id: id_pedido})

        if(!pedido){

            throw new Error("Pedido não encontrado")
        }

        const venda = VendasRepository.create({

            cod_venda,
            valor_venda,
            pedido
        })

        await VendasRepository.save(venda)

        return venda
    }
}
