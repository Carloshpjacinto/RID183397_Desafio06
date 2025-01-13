import 'reflect-metadata'
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'
import { IListaPedidos } from '../models/IListaPedidos';

export default class ListaPedidosService{

    public async execute(): Promise<Pedido | IListaPedidos[] | string>{

        const pedidos = await PedidoRepository.find({relations: ["cliente", "produto"]});

        if(!pedidos){

            return ("Pedidos não encontrados")
        }

        const listaSerializacao:IListaPedidos[] = pedidos.map((pedido) => ({

            id: pedido.id,
            cod_pedido: pedido.cod_pedido,
            cliente:{
                id: pedido.cliente.id,
                nome: pedido.cliente.nome_cliente,
                email: pedido.cliente.email,
                endereco: {
                    logradouro: pedido.cliente.logradouro,
                    endereco: pedido.cliente.endereco,
                    cep: pedido.cliente.cep,
                    numero: pedido.cliente.numero_endereco
                }
            },
            produto:{
                quantidade: pedido.qtd_produto_pedido,
                nome: pedido.produto.nome_produto,
                categoria: pedido.produto.categoria,
                preco: pedido.produto.preco,
                desconto: pedido.produto.desconto
            }
        }))

        return listaSerializacao
    }
}
