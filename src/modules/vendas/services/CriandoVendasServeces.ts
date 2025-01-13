import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { VendasRepository } from '../repositories/VendasRepository'
import { PedidoRepository } from '../../pedidos/repositories/PedidoRepository';
import { ProdutoRepository } from '../../produtos/repositories/ProdutoRepository';
import { ClienteRepository } from '../../clientes/repositories/ClienteRepository';
import { EstoqueRepository } from '../../estoque/repositories/EstoqueRepository';
import { ICriandoVenda } from '../models/ICriandoVenda';

export default class CriandoVendaServece{

    async execute({ cod_venda, valor_venda, id_pedido}: ICriandoVenda): Promise<Venda | string>{

        const pedido = await PedidoRepository.findOne({where: {id: id_pedido}, relations: ["produto", "cliente"],})
        
        const verificacaoPedido = await VendasRepository.findOne({where: {pedido: {id: id_pedido}}, relations: ["pedido"]})
                    
        if(!pedido){
                    
            return ('O pedido não foi encontrado')
        }
        
        if(verificacaoPedido){
        
            return ('O pedido informado já foi processado para venda')
        }
            
        const produto = await ProdutoRepository.findOne({where: {id: pedido.produto.id}, relations: ["estoque"]})
            
        if(!produto){
                    
            return ("Produto não encontrado")
        }
            
        const cliente = await ClienteRepository.findOne({where: {id: pedido.cliente.id}})
            
        if(!cliente){
                    
            return ("Cliente não encontrado")
        }
            
        const estoque = await EstoqueRepository.findOne({where: {id: produto.estoque.id}})
            
        if(!estoque){
                    
            return ("Estoque não encontrado")
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
