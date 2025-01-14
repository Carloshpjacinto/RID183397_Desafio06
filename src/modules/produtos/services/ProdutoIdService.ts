import 'reflect-metadata';
import { Produto } from "../entities/Produtos";
import { IId } from "../models/IId";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export default class ProdutoIdService{

    public async execute({id}: IId): Promise<Produto | string>{

        const produto = await ProdutoRepository.findOne({where: {id: id}, relations: ["estoque"]});

        if(!produto){

            return ('Produto não encontrado');
        }

        return produto;
    };
};
