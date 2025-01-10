import 'reflect-metadata'
import { Estoque } from '../entities/Estoque'
import { EstoqueRepository } from '../repositories/EstoqueRepository'

interface IcriandoEstoque{

    qtd_estoque: number
}

export default class CriandoEstoqueServece{

    async execute({ qtd_estoque }: IcriandoEstoque): Promise<Estoque>{

        const estoque = EstoqueRepository.create({

            qtd_estoque
        })

        await EstoqueRepository.save(estoque)

        return estoque
    }
}
