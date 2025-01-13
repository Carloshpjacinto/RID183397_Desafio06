import 'reflect-metadata';
import { IcriandoEstoque } from "../models/ICriandoEstoque";
import { Estoque } from "../entities/Estoque";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export default class CriandoEstoqueServece{

    async execute({ qtd_estoque }: IcriandoEstoque): Promise<Estoque | string>{

        const estoque = EstoqueRepository.create({

            qtd_estoque
        })

        const est = await EstoqueRepository.save(estoque);

        return `Estoque de id: ${est.id} criado com sucesso`;
    };
};
