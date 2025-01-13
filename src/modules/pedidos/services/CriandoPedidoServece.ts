import 'reflect-metadata'
import { ICriandoPedido } from "../models/ICriandoPedido"
import { IserializacaoPedido } from '../models/ISerializacaoPedido';
import { Pedido } from '../entities/Pedidos'
import { PedidoRepository } from '../repositories/PedidoRepository'
import { ClienteRepository } from '../../clientes/repositories/ClienteRepository';
import { ProdutoRepository } from '../../produtos/repositories/ProdutoRepository';
import { EstoqueRepository } from '../../estoque/repositories/EstoqueRepository';

export default class CriandoPedidoServece{

    async execute({cod_pedido, qtd_produto_pedido, id_cliente, id_produto}: ICriandoPedido): Promise<Pedido | IserializacaoPedido | string>{

        const cliente = await ClienteRepository.findOne({where: {id: id_cliente}})
        
        if (!cliente) {
            
            return ("Cliente não encontrado");
        }

        const produto = await ProdutoRepository.findOne({where: {id: id_produto}, relations:['estoque']})
        
        if (!produto) {

            return ("Produto não encontrado");
        }

        const estoque = await EstoqueRepository.findOne({where: {id: produto.estoque.id}})
                        
        if(!estoque){
                                
            return ("Estoque não encontrado")
        }

        const qtdEstoque = Number(estoque.qtd_estoque)
    
        const qtdPedido = Number(qtd_produto_pedido)

        if(qtdEstoque == 0){

            return ("Esse produto já não está mais disponivel")

        }else if(qtdEstoque < qtdPedido){

            return ("Essa quantidade não está disponivel para venda") 
        }

        const pedido = PedidoRepository.create({

            cod_pedido,
            qtd_produto_pedido,
            cliente,
            produto
        })

        const valorAtualizadoEstoque = qtdEstoque - qtdPedido
    
        await EstoqueRepository.atualizacaoEstoque(produto.estoque.id, {

            qtd_estoque: valorAtualizadoEstoque
        })

        const ped = await PedidoRepository.save(pedido)

        const serializacao:IserializacaoPedido = {

            id: ped.id,
            codPedido: ped.cod_pedido,
            cliente: {
                id: cliente.id,
                nome: cliente.nome_cliente,
                email: cliente.email,
                endereco: {
                    logradouro: cliente.logradouro,
                    endereco: cliente.endereco,
                    cep: cliente.cep,
                    numero: cliente.numero_endereco
                }
            },

            produto: {
                quantidade: ped.qtd_produto_pedido,
                nome: produto.nome_produto,
                categoria: produto.categoria,
                preco: produto.preco,
                desconto: produto.desconto
            }
        }

        return serializacao
    }
}
