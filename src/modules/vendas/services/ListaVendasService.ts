import 'reflect-metadata';
import { Venda } from "../entities/Vendas";
import { ISerializacaoVenda } from "../models/ISerializacaoVenda";
import { VendasRepository } from "../repositories/VendasRepository";

export default class ListaVendasService{

    public async execute(): Promise<ISerializacaoVenda[] | Venda>{

        const vendas = await VendasRepository.find({relations: ["pedido", "pedido.produto", "pedido.cliente"]});

        const listaSerializacao:ISerializacaoVenda[] = vendas.map((venda) => ({

            id: venda.id,
            cod_venda: venda.cod_venda,

            pedido: {
                id: venda.pedido.id,
                cod_pedido: venda.pedido.cod_pedido,

                cliente: {
                        id: venda.pedido.cliente.id,
                        nome: venda.pedido.cliente.nome_cliente,
                        email: venda.pedido.cliente.email,
                        endereco: {
                            logradouro: venda.pedido.cliente.logradouro,
                            endereco: venda.pedido.cliente.endereco,
                            cep: venda.pedido.cliente.cep,
                            numero: venda.pedido.cliente.numero_endereco,
                        }
                },

                produto: {
                    id: venda.pedido.produto.id,
                    quantidade: venda.pedido.qtd_produto_pedido,
                    nome: venda.pedido.produto.nome_produto,
                    categoria: venda.pedido.produto.categoria,
                    preco: venda.pedido.produto.preco,
                    desconto: venda.pedido.produto.desconto,
                }
            },

            valor_venda: venda.valor_venda,
            data_venda: venda.data_venda
        }))

        return listaSerializacao;
    };
};
