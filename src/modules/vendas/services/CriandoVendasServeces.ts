import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { VendasRepository } from '../repositories/VendasRepository'

interface Icriandovenda{

    cod_venda: number;
    desconto_produto: number;
    valor_venda: number;
    qtd_pedido: number;
}

export default class CriandoVendaServece{

    async execute({ cod_venda, desconto_produto, valor_venda, qtd_pedido}: Icriandovenda): Promise<Venda>{

        const venda = VendasRepository.create({

            cod_venda,
            desconto_produto,
            valor_venda,
            qtd_pedido
        })

        await VendasRepository.save(venda)

        return venda
    }
}
