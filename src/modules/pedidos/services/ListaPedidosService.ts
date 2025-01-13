import 'reflect-metadata';
import { Pedido } from "../entities/Pedidos";
import { IserializacaoPedido } from "../models/ISerializacaoPedido";
import { PedidoRepository } from "../repositories/PedidoRepository";

export default class ListaPedidosService{

    public async execute(): Promise<Pedido | IserializacaoPedido[] | string>{

        const pedidos = await PedidoRepository.find({relations: ["cliente", "produto"]});

        if(!pedidos){

            return ("Pedidos não encontrados");
        }

        const listaSerializacao:IserializacaoPedido[] = pedidos.map((pedido) => ({

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
                id: pedido.produto.id,
                quantidade: pedido.qtd_produto_pedido,
                nome: pedido.produto.nome_produto,
                categoria: pedido.produto.categoria,
                preco: pedido.produto.preco,
                desconto: pedido.produto.desconto
            }
        }))

        return listaSerializacao;
    };
};
