import 'reflect-metadata';
import { Venda } from "../entities/Vendas";
import { VendasRepository } from "../repositories/VendasRepository";
import { PedidoRepository } from "../../pedidos/repositories/PedidoRepository";
import { ICriandoVenda } from "../models/ICriandoVenda";
import { ISerializacaoVenda } from '../models/ISerializacaoVenda';

export default class CriandoVendaServece{

    async execute({ id_pedido }: ICriandoVenda): Promise<Venda | ISerializacaoVenda | string>{

        const codVenda = Math.floor(Math.random() * 99999);

        const pedido = await PedidoRepository.findOne({where: {id: id_pedido}, relations: ["produto", "cliente"],});

        if(!pedido){
                
            return ('O pedido não foi encontrado');
        }

        const verificacaoPedido = await VendasRepository.findOne({where: {pedido: {id: id_pedido}}, relations: ["pedido"]});
                
        if(verificacaoPedido){
                
            return ('O pedido informado já foi processado para venda');
        }

        const preco = pedido.produto.preco
        
        const desconto = pedido.produto.desconto
        
        const desconto_replace = desconto.replace('%', '')
        const desconto_numero = Number(desconto_replace)

        let valorFinalVenda = 0

        if(desconto_numero != 0){

            valorFinalVenda = ((preco - (preco * (desconto_numero / 100))) * pedido.qtd_produto_pedido)

        }else{

            valorFinalVenda = (preco * pedido.qtd_produto_pedido)
        } 

        const venda = VendasRepository.create({

            cod_venda: codVenda,
            valor_venda: valorFinalVenda,
            pedido
        })

        await VendasRepository.save(venda);

        const serializacaoVenda:ISerializacaoVenda = {

            id: venda.id,
            cod_venda: venda.cod_venda,

            pedido: {
                id: pedido.id,
                cod_pedido: pedido.cod_pedido,

                cliente: {
                        id: pedido.cliente.id,
                        nome: pedido.cliente.nome_cliente,
                        email: pedido.cliente.email,
                        endereco: {
                            logradouro: pedido.cliente.logradouro,
                            endereco: pedido.cliente.endereco,
                            cep: pedido.cliente.cep,
                            numero: pedido.cliente.numero_endereco,
                        }
                },

                produto: {
                    id: pedido.produto.id,
                    quantidade: pedido.qtd_produto_pedido,
                    nome: pedido.produto.nome_produto,
                    categoria: pedido.produto.categoria,
                    preco: pedido.produto.preco,
                    desconto: pedido.produto.desconto,
                }
            },

            valor_venda: venda.valor_venda,
            data_venda: venda.data_venda

        }

        return serializacaoVenda;
    }
}
