import 'reflect-metadata'
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'
import { ClienteRepository } from '../../clientes/repositories/ClienteRepository';
import { ProdutoRepository } from '../../produtos/repositories/ProdutoRepository';

interface IcriandoPedido{

    cod_pedido: number;
    qtd_produto_pedido: number
    id_cliente: number;
    id_produto: number;

}

export default class CriandoPedidoServece{

    async execute({cod_pedido, qtd_produto_pedido, id_cliente, id_produto}: IcriandoPedido): Promise<Pedido>{

        const cliente = await ClienteRepository.findOneBy({id: id_cliente})
        
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        const produto = await ProdutoRepository.findOneBy({id: id_produto})
        
        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        const pedido = PedidoRepository.create({

            cod_pedido,
            qtd_produto_pedido,
            cliente,
            produto
        })

        await PedidoRepository.save(pedido)

        return pedido
    }
}
