import 'reflect-metadata';
import { IId } from "../models/IId";
import { IserializacaoPedido } from "../models/ISerializacaoPedido";
import { Pedido } from "../entities/Pedidos";
import { PedidoRepository } from "../repositories/PedidoRepository";

export default class PedidoIdService{

    public async execute({id}: IId): Promise<Pedido | IserializacaoPedido | string>{

        const pedido = await PedidoRepository.findOne({where: {id: id}, relations: ["produto", "cliente"]});

        if(!pedido){

            return ('Pedido não encontrado');
        }

        const listaSerializacao:IserializacaoPedido = {
        
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
        }

        return listaSerializacao;
    };
};
