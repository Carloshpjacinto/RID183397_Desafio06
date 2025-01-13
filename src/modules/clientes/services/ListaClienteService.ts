import 'reflect-metadata'
import { ISerializacao } from '../models/ISerializacao'
import { Cliente } from '../entities/Clientes'
import { ClienteRepository } from '../repositories/ClienteRepository'

export default class ListaClienteService{

    public async execute(): Promise<ISerializacao[] | Cliente | string>{

        const clientes = await ClienteRepository.find();

        if(!clientes){

            return ("Clientes não encontrados")
        }

        const listaSerializacao:ISerializacao[] = clientes.map((cliente) => ({

            id: cliente.id,
            nome: cliente.nome_cliente,
            email: cliente.email,
            endereco: {
                logradouro: cliente.logradouro,
                endereco: cliente.endereco,
                cep: cliente.cep,
                numero: cliente.numero_endereco
            }
        }))

        return listaSerializacao
    }
}
