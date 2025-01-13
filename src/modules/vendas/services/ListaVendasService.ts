import 'reflect-metadata'
import { Venda } from '../entities/Vendas'
import { IlIstaVendas } from '../models/IListaVendas';
import { VendasRepository } from '../repositories/VendasRepository'

export default class ListaVendasService{

    public async execute(): Promise<IlIstaVendas[] | Venda>{

        const vendas = await VendasRepository.find({relations: ["pedido"]});

        const listaSerializacao:IlIstaVendas[] = vendas.map((venda) => ({
                        
            id: venda.id,
            cod_venda: venda.cod_venda,
            valorVenda: venda.valor_venda,
            data_venda: venda.data_venda,
            pedido: venda.pedido,
            produto: venda.pedido.produto
        }))

        return listaSerializacao
    }
}
