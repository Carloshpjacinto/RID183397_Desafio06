import 'reflect-metadata'
import { IListaEstoque } from "../models/IListaEstoque";
import { Estoque } from "../entities/Estoque";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export default class ListaClienteService{

    public async execute(): Promise<IListaEstoque[] | Estoque>{

        const estoques = await EstoqueRepository.find();

        const listaEstoque:IListaEstoque[] = estoques.map((estoque) => ({

            id: estoque.id,
            quantidade: estoque.qtd_estoque
        }))

        return listaEstoque;
    };
};
